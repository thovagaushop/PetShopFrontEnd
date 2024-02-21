import { Alert, Breadcrumbs, Snackbar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import instance from "../../api/axios";
import { getProductImage } from "../../utils";
import moment from "moment";
import Paypal from "../../components/paypal/Paypal";

export default function TakeCare() {
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const [booking, setBooking] = useState({
    startDate: "",
    endDate: "",
    petType: "",
    note: "",
  });
  const [availbleBookingSlot, setAvailbleBookingSlot] = useState(0);
  const [bookingConfig, setBookingConfig] = useState(null);
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const [isPayed, setIsPayed] = useState(false);
  const [service, setService] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleMessage = (mess, status) => {
    setMessage({
      ...message,
      open: true,
      type: status,
      content: mess,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(booking);
    if (!isPayed) {
      setMessage({
        ...message,
        open: true,
        type: "error",
        content: "You need pay 50 % yet",
      });
      return;
    }
    try {
      await instance.post(
        `/-take-care-bookings`,
        { ...booking },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      fetchBookingConfig();
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

  const fetchBookingConfig = async () => {
    try {
      const { data } = await instance.get("/config");
      setBookingConfig(data);
      if (data.maxPlaceTakeCare - data.currentTakeCareBooking > 0) {
        setAvailbleBookingSlot(
          data.maxPlaceTakeCare - data.currentTakeCareBooking
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculatePrice = () => {
    let total = 0;
    let start = moment(booking.startDate);
    let end = moment(booking.endDate);
    let priceByPet = booking.petType === "SENIOR_DOG" ? 10 : 5;

    total += priceByPet * Number(end.diff(start, "days") + 1);

    console.log("Number day", end.diff(start, "days") + 1);
    if (service.length) {
      for (const ser of service) {
        total += ser.price;
      }
    }
    setTotalPrice(total);
  };

  useEffect(() => {
    fetchBookingConfig();
  }, []);

  useEffect(() => {
    calculatePrice();
  }, [booking, service]);
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
        <div className="mt-[100px] w-[50%] border-[5px] border-[var(--grey-background-header)] flex flex-col justify-start items-center">
          <div className="font-bold text-[32px] mt-3 text-[var(--hover-color)]">
            Form booking an examination
          </div>

          <div className="font-bold rounded-[10px] text-[20px] mt-3 text-white bg-[var(--violet-color)] p-2">
            Availble slot: {availbleBookingSlot}
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
              disabled={!!!availbleBookingSlot}
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
              disabled={!!!availbleBookingSlot}
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
              disabled={!!!availbleBookingSlot}
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
              disabled={!!!availbleBookingSlot}
              id="note"
              name="description"
              rows="4"
              cols="50"
              className="outline-[var(--grey-border)] border-2 w-[100%] w-[300px]"
              required
            ></textarea>
            <label for="note" className="my-[20px]">
              Choose food type:
            </label>

            {/* Food 1 */}
            <div className="flex flex-row justify-around">
              <div className="w-[130px] h-[150px] border border-[var(--hover-color)] hover:bg-[var(--hover-color)] hover:text-white flex flex-col items-center justify-around cursor-pointer">
                {bookingConfig?.food1Image && (
                  <img
                    src={getProductImage(bookingConfig?.food1Image)}
                    className="w-[60px] h-[60px]"
                    alt="Imagefood1"
                  />
                )}
                <div className="mt-2">
                  <div>
                    {bookingConfig?.food1}: ${bookingConfig?.food1Price}
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px]"
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!service.includes((el) => el.id === 1)) {
                          if (!service.some((el) => el.id === 1)) {
                            setService((prev) => [
                              ...prev,
                              {
                                id: 1,
                                price: bookingConfig?.food1Price,
                                name: bookingConfig?.food1,
                              },
                            ]);
                          }
                        }
                      } else {
                        if (service.some((el) => el.id === 1)) {
                          const updatedService = service.filter(
                            (el) => el.id !== 1
                          );
                          setService(updatedService);
                        }
                      }
                    }}
                  />
                </div>
              </div>
              {/* Food 2 */}
              <div className="w-[130px] h-[150px] border border-[var(--hover-color)] hover:bg-[var(--hover-color)] hover:text-white flex flex-col items-center justify-around cursor-pointer">
                {bookingConfig?.food2Image && (
                  <img
                    src={getProductImage(bookingConfig?.food2Image)}
                    className="w-[60px] h-[60px]"
                    alt="Imagefood1"
                  />
                )}
                <div className="mt-2">
                  <div>
                    {bookingConfig?.food2}: ${bookingConfig?.food2Price}
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px]"
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!service.includes((el) => el.id === 2)) {
                          if (!service.some((el) => el.id === 2)) {
                            setService((prev) => [
                              ...prev,
                              {
                                id: 2,
                                price: bookingConfig?.food2Price,
                                name: bookingConfig?.food2,
                              },
                            ]);
                          }
                        }
                      } else {
                        if (service.some((el) => el.id === 2)) {
                          const updatedService = service.filter(
                            (el) => el.id !== 2
                          );
                          setService(updatedService);
                        }
                      }
                    }}
                  />
                </div>
              </div>
              {/* Food 3 */}
              <div className="w-[130px] h-[150px] border border-[var(--hover-color)] hover:bg-[var(--hover-color)] hover:text-white flex flex-col items-center justify-around cursor-pointer">
                {bookingConfig?.foodImage3 && (
                  <img
                    src={getProductImage(bookingConfig?.food3Image)}
                    className="w-[60px] h-[60px]"
                    alt="Imagefood1"
                  />
                )}
                <div className="mt-2">
                  <div>
                    {bookingConfig?.food3}: ${bookingConfig?.food3Price}
                  </div>
                </div>
                <div>
                  <input
                    type="checkbox"
                    className="w-[20px] h-[20px]"
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!service.includes((el) => el.id === 3)) {
                          if (!service.some((el) => el.id === 3)) {
                            setService((prev) => [
                              ...prev,
                              {
                                id: 3,
                                price: bookingConfig?.food3Price,
                                name: bookingConfig?.food3,
                              },
                            ]);
                          }
                        }
                      } else {
                        if (service.some((el) => el.id === 3)) {
                          const updatedService = service.filter(
                            (el) => el.id !== 3
                          );
                          setService(updatedService);
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <label for="note" className="my-[20px]">
              Choose Service:
            </label>

            <div className="flex flex-row justify-around">
              <div className="flex items-center gap-2">
                <label>
                  {bookingConfig?.service1} (${bookingConfig?.service1Price})
                </label>
                <input
                  type="checkbox"
                  width={60}
                  height={60}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (!service.includes((el) => el.id === 4)) {
                        if (!service.some((el) => el.id === 4)) {
                          setService((prev) => [
                            ...prev,
                            {
                              id: 4,
                              price: bookingConfig?.service1Pric,
                              name: bookingConfig?.service1,
                            },
                          ]);
                        }
                      }
                    } else {
                      if (service.some((el) => el.id === 4)) {
                        const updatedService = service.filter(
                          (el) => el.id !== 4
                        );
                        setService(updatedService);
                      }
                    }
                  }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label>
                  {bookingConfig?.service2} (${bookingConfig?.service2Price})
                </label>
                <input
                  type="checkbox"
                  width={60}
                  height={60}
                  onChange={(e) => {
                    if (e.target.checked) {
                      if (!service.includes((el) => el.id === 5)) {
                        if (!service.some((el) => el.id === 5)) {
                          setService((prev) => [
                            ...prev,
                            {
                              id: 5,
                              price: bookingConfig?.service2Price,
                              name: bookingConfig?.service2,
                            },
                          ]);
                        }
                      }
                    } else {
                      if (service.some((el) => el.id === 5)) {
                        const updatedService = service.filter(
                          (el) => el.id !== 5
                        );
                        setService(updatedService);
                      }
                    }
                  }}
                />
              </div>
            </div>
            {bookingConfig && (
              <div className="my-[30px] ">
                <Paypal
                  amount={totalPrice / 2}
                  payload={{
                    booking,
                    service,
                    totalPrice,
                    token: userInfo.token,
                  }}
                  handleMessage={handleMessage}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
