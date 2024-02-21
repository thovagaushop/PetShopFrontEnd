import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect } from "react";
import instance from "../../api/axios";

const style = { layout: "vertical" };

const ButtonWrapper = ({
  currency,
  showSpinner,
  amount,
  payload,
  handleMessage,
}) => {
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);
  console.log({ payload });
  console.log({ amount });
  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}

      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(data, actions) =>
          actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => orderId)
        }
        onApprove={(data, actions) =>
          actions.order.capture().then(async (response) => {
            if (response.status === "COMPLETED") {
              let note = payload.booking?.note + ", service:";
              if (payload.service.length) {
                for (let i = 0; i < payload.service.length; i++) {
                  note += ` ${payload.service[i].name},`;
                }
              }
              console.log(note);
              try {
                await instance.post(
                  `/take-care-bookings`,
                  {
                    ...payload.booking,
                    note: note,
                    totalPrice: payload.totalPrice,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${payload.token}`,
                    },
                  }
                );
                handleMessage("Pay success", "success");
              } catch (e) {
                handleMessage(e.response.data.message, "error");
              }

              // Save database here
              return;
            } else {
              handleMessage("Something wrong", "error");
              return;
            }
          })
        }
      />
    </>
  );
};

export default function Paypal({ amount, payload, handleMessage }) {
  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: "test",
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          currency={"USD"}
          amount={amount}
          payload={payload}
          handleMessage={handleMessage}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
