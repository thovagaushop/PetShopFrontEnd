import { Alert, Breadcrumbs, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../api/axios";
import moment from "moment";

export default function TakeCare() {
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

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(booking);
    try {
      await instance.post(
        `take-care-bookings`,
        { ...booking },
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
      setBooking({
        startDate: "",
        endDate: "",
        note: "",
        petType: "",
        note: "",
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
        <div className="mt-[100px] w-[50%] h-[700px] border-[5px] border-[var(--grey-background-header)] flex flex-col justify-start items-center">
          <div className="font-bold text-[32px] mt-3 text-[var(--hover-color)]">
            Form booking an examination
          </div>
          <form
            className="mt-[30px] w-[80%] text-[16px] flex flex-col"
            onSubmit={handleSubmit}
          >
            <label for="date" className="my-[20px]">
              {" "}
              Select Start Date:{" "}
            </label>
            <input
              onChange={(e) =>
                setBooking({ ...booking, startDate: e.target.value })
              }
              value={booking.startDate}
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
              required
            />

            <label for="date" className="my-[20px]">
              {" "}
              Select End Date:{" "}
            </label>
            <input
              onChange={(e) =>
                setBooking({ ...booking, endDate: e.target.value })
              }
              value={booking.endDate}
              type="date"
              id="date"
              min={new Date().toISOString().split("T")[0]}
              max={
                new Date(new Date().setMonth(new Date().getMonth() + 1))
                  .toISOString()
                  .split("T")[0]
              }
              className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
              required
            />

            <label for="select" className="my-[20px]">
              {" "}
              Select Pet Type:{" "}
            </label>
            <select
              id="select"
              onChange={(e) =>
                setBooking({ ...booking, petType: e.target.value })
              }
              value={booking.petType}
              required
            >
              <option value="" selected>
                Select
              </option>
              <option value="SENIOR_DOG">Senior Dogs (10$ / day)</option>
              <option value="CAT">Cat (5$ / day)</option>
              <option value="FISH">Fish (5$ / day)</option>
              <option value="SMALL_PET">Small Pet (5$ / day)</option>
              <option value="BIRD">Bird (5$ / day)</option>
              <option value="REPTILE">Reptile (5$ / day)</option>
              <option value="RABBIT">Rabbit (5$ / day)</option>
            </select>

            <label for="note" className="my-[20px]">
              Note:
            </label>
            <textarea
              onChange={(e) => setBooking({ ...booking, note: e.target.value })}
              value={booking.note}
              id="note"
              name="description"
              rows="4"
              cols="50"
              className="outline-[var(--grey-border)] border-2 w-[100%] w-[300px]"
              required
            ></textarea>

            <input
              className="mt-[30px] bg-[var(--violet-color)] rounded-[50px] text-white py-[10px] px-[20px] outline-none cursor-pointer hover:bg-[var(--hover-color)]"
              type="submit"
              value="Booking"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
