import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../api/axios";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Alert, Snackbar } from "@mui/material";
import moment from "moment";

export default function MyTakeCare() {
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const [bookings, setBookings] = useState([]);
  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    petType: "",
    note: "",
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

  const fetchBookings = async () => {
    try {
      const { data } = await instance.get(`take-care-bookings`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setBookings(data);
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
  };

  const handleDelete = (id) => async () => {
    try {
      await instance.delete(`take-care-bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      await fetchBookings();
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
    fetchBookings();
  }, []);
  return (
    <div className="px-[100px]">
      <Breadcrumbs />
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
      <div className="flex justify-center items-center gap-10">
        <div className="flex justify-center items-start w-[50%] mt-[50px] h-[700px]">
          <table className="w-[100%]">
            <thead>
              <tr>
                <th>#</th>
                <th>From</th>
                <th>To</th>
                <th>Pet Type</th>
                <th>Note</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 &&
                bookings.map((item, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{moment(item.startDate).format("YYYY-MM-DD")}</td>
                    <td>{moment(item.endDate).format("YYYY-MM-DD")}</td>
                    <td>{item.petType}</td>
                    <td>{item.note}</td>
                    <td>$ {item.price}</td>
                    <td>
                      <button
                        className="bg-[var(--violet-color)] px-[10px] py-[5px] rounded-[50px] text-white hover:bg-[var(--hover-color)]"
                        onClick={handleDelete(item.id)}
                      >
                        Delete
                      </button>
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
