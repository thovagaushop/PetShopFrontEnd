import { Alert, Snackbar } from "@mui/material";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { useEffect, useState } from "react";
import instance from "../../api/axios";
import moment from "moment";
import { useSelector } from "react-redux";

export default function MyOrder() {
  const [orders, setOrders] = useState([]);

  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);

  const fetchOrders = async () => {
    try {
      const { data } = await instance.get(`orders`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setOrders(data);
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleDelete = (id) => async () => {
    try {
      await instance.delete(`examination-bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      await fetchOrders();
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Delete successfully",
      });
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="px-[100px]">
      <Breadcrumbs />
      <Snackbar
        anchorOrigin={{
          vertical: message.vertical,
          horizontal: message.horizontal,
        }}
        autoHideDuration={3000}
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
      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center items-start w-[50%] mt-[50px] h-[700px]">
          <table className="w-[100%]">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Products</th>
                <th>Payment method</th>
                <th>Total Amount</th>
                <th>Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 &&
                orders.map((item, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{moment(item.orderDate).format("YYYY-MM-DD")}</td>
                    <td width={200}>
                      {item?.orderItems.map((orderItem) => (
                        <div>
                          {orderItem.product.title} x {orderItem.quantity}
                          <hr />
                        </div>
                      ))}
                    </td>
                    <td>{item.payment.paymentMethod}</td>
                    <td>{item.totalAmount}</td>
                    <td>{item.address}</td>
                    <td>
                      <div
                        style={{
                          padding: "10px",
                          backgroundColor:
                            item.orderStatus === "PENDING" ? "yellow" : "green",
                          color:
                            item.orderStatus === "PENDING" ? "black" : "white",
                          borderRadius: "10px",
                          fontWeight: "bold",
                          fontSize: "14px",
                        }}
                      >
                        {item.orderStatus}
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
