import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { Alert, Snackbar } from "@mui/material";
import { useSelector } from "react-redux";
import instance from "../../api/axios";
import moment from "moment";

export default function Examination() {
  const [booking, setBooking] = useState({
    date: "",
    time: "",
    description: "",
  });
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
      const { data } = await instance.get(
        `examination-bookings?email=${userInfo.email}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await instance.post(
        `examination-bookings`,
        {
          date: `${booking.date}T${booking.time}:00.000+07:00`,
          email: userInfo.email,
          description: booking.description,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      fetchBookings();
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Booking successfully",
      });
    } catch (error) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: error.response.data.message,
      });
    }
    setBooking({
      date: "",
      time: "",
      description: "",
    });
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
      <div className="flex justify-around items-center gap-10">
        <div className="mt-[100px] w-[50%] h-[700px] border-[5px] border-[var(--grey-background-header)] flex flex-col justify-start items-center">
          <div className="font-bold text-[28px] mt-3 text-[var(--hover-color)]">
            Form booking an examination
          </div>
          <form
            className="mt-[30px] w-[80%] text-[16px] flex flex-col"
            onSubmit={handleSubmit}
          >
            <label for="date" className="my-[20px]">
              {" "}
              Select Date:{" "}
            </label>
            <input
              onChange={(e) => setBooking({ ...booking, date: e.target.value })}
              value={booking.date}
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
              required
            />

            <label for="time" className="my-[20px]">
              Select Time:
            </label>
            <input
              onChange={(e) => setBooking({ ...booking, time: e.target.value })}
              value={booking.time}
              type="time"
              id="time"
              name="time"
              className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
              required
            />

            <label for="description" className="my-[20px]">
              Description:
            </label>
            <textarea
              onChange={(e) =>
                setBooking({ ...booking, description: e.target.value })
              }
              value={booking.description}
              id="description"
              name="description"
              rows="4"
              cols="50"
              className="outline-[var(--grey-border)] border-2 w-[100%] w-[300px]"
              required
            ></textarea>

            <input
              className="mt-[30px] bg-[var(--violet-color)] rounded-[50px] text-white py-[10px] px-[20px] outline-none cursor-pointer hover:bg-[var(--hover-color)]"
              type="submit"
              value="Book Appointment"
            />
          </form>
        </div>
        <div className="flex justify-center items-start w-[50%] mt-[100px] h-[700px]">
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
