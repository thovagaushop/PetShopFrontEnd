import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import instance from "../../api/axios";
import { getProductImage } from "../../utils";
import { round, sumBy } from "lodash";
import { resetCart } from "../../redux/orebiSlice";

const style = { layout: "vertical" };

function createOrder(data) {
  const bodyData = {
    total: data.totalPrice,
    address: data.address,
  };
  return fetch(
    // "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
    "http://localhost:8080/api/paypal/init",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify(bodyData),
    }
  )
    .then((response) => response.json())
    .then((order) => {
      // Your code here after create the order
      return order.id;
    });
}
function onApprove(data) {
  // replace this url with your server
  return fetch(
    // "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    "http://localhost:8080/api/paypal/capture",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }
  )
    .then((response) => response.json())
    .then((orderData) => {
      window.location.href = orderData.redirectLink;
      // Your code here after capture the order
      // window.location.href = "http";
    });
}

const ButtonWrapper = ({ showSpinner, data }) => {
  const [{ isPending }] = usePayPalScriptReducer();

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={() => createOrder(data)}
        onApprove={onApprove}
      />
    </>
  );
};

export default function Checkout() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.orebiReducer.userInfo);
  const [address, setAddress] = useState("");
  const [usePayPal, setUsePayPal] = useState(false);
  const [cart, setCart] = useState({
    totalPrice: 0,
    products: [],
  });
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleGetAddress = async () => {
    try {
      const { data } = await instance.get(`/users/profile`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      });
      setAddress(data.address);
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  const fetchCart = async () => {
    const headers = {
      Authorization: `Bearer ${userData.token}`,
    };
    try {
      const { data } = await instance.get(`/cart`, {
        headers,
      });
      const fetchProducts = data.products.map((item) => ({
        ...item,
        image: getProductImage(item.image),
      }));
      setCart({ totalPrice: data.totalPrice, products: fetchProducts });
    } catch (error) {
      console.log(error);
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await instance.post(
        "/orders",
        {
          userAddress: address,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Order successfully",
      });
      dispatch(resetCart());
      await fetchCart();
    } catch (error) {
      console.log(error);
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="px-[100px]">
      <Breadcrumbs title="Checkout" />
      <Snackbar
        anchorOrigin={{
          vertical: message.vertical,
          horizontal: message.horizontal,
        }}
        autoHideDuration={1000}
        open={message.open}
        onClose={handleCloseSnack}
        message="I love snacks"
        key={message.vertical + message.horizontal}
      >
        <Alert
          onClose={handleCloseSnack}
          severity={message.type}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message.content}
        </Alert>
      </Snackbar>
      <div className="flex justify-between items-start gap-20">
        <div className="cart-table flex-1 flex flex-col justify-start">
          <h1 className="text-[30px] font-bold">Billing details</h1>
          <label for="address" className="mt-3">
            Address:
          </label>
          <div className="flex items-center w-[80%] h-[50px] p-[15px] border-2 border-[var(--grey-bolder)]">
            <input
              type="text"
              id="address"
              placeholder="Type in your address"
              className="w-[100%] outline-none"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <div
              class="relative text-white w-[24px] h-[24px] text-center bg-[var(--violet-color)] hover:cursor-pointer hover:bg-[var(--hover-color)]"
              title="Get your current address"
              onClick={handleGetAddress}
            >
              <i class="fas fa-location-dot absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
            </div>
          </div>
          <label for="pay-type" className="mt-3">
            PayPal:
          </label>

          <input
            type="checkbox"
            className="w-[30px] h-[30px] checked:bg-[var(--hover-color)]"
            onChange={() => setUsePayPal(!usePayPal)}
          />
        </div>
        <div className="flex-1 w-[330px] border-[5px] border-[#E5E5E5]">
          <div className="flex flex-col items-center">
            <div className="text-[30px] font-bold border-b-2 border-black w-[80%] py-[8px]">
              Your Order
            </div>
            <div className="flex justify-between items-center gap-[20px] py-[12px] border-b-2 border-black w-[80%]">
              <table className="w-[90%]">
                <thead>
                  <tr className="flex justify-around">
                    <th>Product</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--grey-bolder)]">
                  {cart.products.length > 0 &&
                    cart.products.map((item, index) => (
                      <tr className="flex justify-around" key={item.productId}>
                        <td>
                          {item.productTitle} x {item.quantity}
                        </td>
                        <td>$ {item.productSpecialPrice}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center gap-[20px] py-[12px] border-b-2 border-black w-[80%]">
              <div className="text-[16px] font-bold-400">Total</div>
              <div className="font-bold text-[26px] text-[var(--hover-color)]">
                $ {cart.totalPrice}
              </div>
            </div>
            {usePayPal ? (
              <div className="mt-10 w-[80%]">
                <PayPalScriptProvider
                  options={{
                    clientId:
                      "AVwcw0eLPB9IBe0MzQxXeBkwF7nSvxYAuUHst18DIyNipw7RFC8dzIndE4eNugKohwHZs03kNQfaL4c-",
                    components: "buttons",
                    currency: "USD",
                  }}
                >
                  <ButtonWrapper
                    showSpinner={false}
                    data={{ ...cart, address, token: userData.token }}
                  />
                </PayPalScriptProvider>
              </div>
            ) : (
              <button
                className="w-[80%] h-[40px] mb-10 bg-[var(--hover-color)] text-white font-bold text-[16px] rounded-[50px] mt-[20px]"
                onClick={handlePlaceOrder}
              >
                Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div style={{ maxWidth: "750px", minHeight: "200px" }}>
  //     <PayPalScriptProvider
  //       options={{
  //         clientId:
  //           "AVwcw0eLPB9IBe0MzQxXeBkwF7nSvxYAuUHst18DIyNipw7RFC8dzIndE4eNugKohwHZs03kNQfaL4c-",
  //         components: "buttons",
  //         currency: "USD",
  //       }}
  //     >
  //       <ButtonWrapper showSpinner={false} />
  //     </PayPalScriptProvider>
  //   </div>
  // );
}
