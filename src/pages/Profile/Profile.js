import { Alert, Breadcrumbs, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import instance from "../../api/axios";
import { login } from "../../redux/orebiSlice";

export default function Profile() {
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const [user, setUser] = useState({
    id: "",
    email: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    address: "",
    password: "",
  });
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const dispatch = useDispatch();

  const fetchUserProfile = async () => {
    try {
      const { data } = await instance.get(`/users/profile`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      console.log(data);
      setUser(data);
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
      await instance.put(`/users/profile`, user, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (user.email !== userInfo.email) {
        const { data } = await instance.post(`auth/login`, {
          email: user.email,
          password: user.password,
        });
        dispatch(login(data));
      }
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Update successfully",
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

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };
  useEffect(() => {
    fetchUserProfile();
  }, []);
  return (
    <div className="px-[100px] flex justify-center">
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
      <div className="mt-[100px] w-[50%] h-[800px] border-[5px] border-[var(--grey-background-header)] flex flex-col justify-start items-center">
        <div className="font-bold text-[32px] mt-3 text-[var(--hover-color)]">
          User profile
        </div>
        <form
          className="mt-[30px] w-[80%] text-[16px] flex flex-col"
          onSubmit={handleSubmit}
        >
          <label for="date" className="my-[20px]">
            {" "}
            Email:{" "}
          </label>
          <input
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            type="text"
            id="email"
            placeholder="Email"
            value={user.email}
            className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
            required
          />

          <label for="date" className="my-[20px]">
            {" "}
            First name:{" "}
          </label>
          <input
            onChange={(e) => setUser({ ...user, firstname: e.target.value })}
            type="text"
            id="firstname"
            value={user.firstname}
            placeholder="Firstname"
            className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
            required
          />

          <label for="date" className="my-[20px]">
            {" "}
            Last name:{" "}
          </label>
          <input
            onChange={(e) => setUser({ ...user, lastname: e.target.value })}
            type="text"
            id="lastname"
            value={user.lastname}
            placeholder="Last name"
            className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
            required
          />

          <label for="date" className="my-[20px]">
            {" "}
            Phone number:{" "}
          </label>
          <input
            onChange={(e) => setUser({ ...user, phoneNumber: e.target.value })}
            type="number"
            id="phoneNumber"
            value={user.phoneNumber}
            placeholder="Phone Number"
            className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
            required
          />

          <label for="date" className="my-[20px]">
            {" "}
            Address:{" "}
          </label>
          <input
            onChange={(e) => setUser({ ...user, address: e.target.value })}
            type="text"
            id="address"
            value={user.address}
            placeholder="Address"
            className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
            required
          />

          <label for="date" className="my-[20px]">
            {" "}
            Confirm password:{" "}
          </label>
          <input
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            id="address"
            placeholder="Password"
            className="w-[100%] outline-none text-[var(--grey-bolder)] w-[300px]"
            required
          />

          <input
            className="mt-[30px] bg-[var(--violet-color)] rounded-[50px] text-white py-[10px] px-[20px] outline-none cursor-pointer hover:bg-[var(--hover-color)]"
            type="submit"
            value="Confirm"
          />
        </form>
      </div>
    </div>
  );
}
