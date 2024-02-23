import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import instance from "../../api/axios";
import moment from "moment";

export default function MyExamination() {
  const [bookings, setBookings] = useState([]);

  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);

  const fetchBookings = async () => {
    try {
      const { data } = await instance.get(`examination-bookings`, {
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
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 &&
                bookings.map((item, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                    <td>{moment(item.date).format("HH:mm")}</td>
                    <td>{item.description}</td>
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
