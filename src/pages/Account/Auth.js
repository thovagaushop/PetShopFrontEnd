import React, { useState } from "react";
import MainHeader from "../../components/home/Header/MainHeader";
import instance from "../../api/axios";
import "./auth.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";
import { login } from "../../redux/orebiSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Auth() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.orebiReducer.userInfo);
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    phoneNumber: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
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

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      await instance.post(`/auth/register`, registerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Register successfully",
      });

      setRegisterData({
        email: "",
        firstname: "",
        lastname: "",
        phoneNumber: "",
        password: "",
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

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await instance.post(`/auth/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      dispatch(login(data));
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Login successfully",
      });
      navigate("/shop");
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
    <div>
      <MainHeader />
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
      <div className="auth-page">
        <div className="parent-text">
          <NavLink to="/">
            <div className="homepage">Home Page</div>
          </NavLink>
          <div className="cart">
            <div style={{ margin: 20 }}></div>
            <div>My account</div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {!userInfo.token && (
            <div className="slideleft">
              <div style={{ fontWeight: "bold", fontSize: 44 }}>Login</div>
              <form
                style={{ display: "flex", flexDirection: "column" }}
                onSubmit={handleSubmitLogin}
              >
                <label for="" style={{ margin: "20px 5px" }}>
                  Username or email address{" "}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="inputs"
                  type="text"
                  placeholder="Username or email address *"
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                />
                <label for="" style={{ fontWeight: 400, margin: "10px 5px" }}>
                  Password <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  className="inputs"
                  type="password"
                  placeholder="Password *"
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <p style={{ padding: 10 }}>
                  <input
                    style={{ width: 14, height: 14, marginRight: 10 }}
                    type="checkbox"
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        rememberMe: e.target.checked,
                      })
                    }
                  />
                  <label for="">remember me</label>
                </p>
                <button type="submit">Log in</button>
              </form>
              <a
                href="##?"
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: 10,
                  color: "#666666",
                }}
              >
                Lost your Password?
              </a>
            </div>
          )}

          <div className="slideright">
            <div style={{ fontWeight: "bold", fontSize: 44 }}>Register</div>
            <form
              action=""
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label for="" style={{ margin: "20px 5px" }}>
                email address <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="text"
                placeholder="Username or email address *"
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
              <label for="" style={{ margin: "20px 5px" }}>
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="text"
                placeholder="First Name *"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstname: e.target.value,
                  })
                }
              />
              <label for="" style={{ margin: "20px 5px" }}>
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="text"
                placeholder="Last Name *"
                onChange={(e) =>
                  setRegisterData({ ...registerData, lastname: e.target.value })
                }
              />
              <label for="" style={{ margin: "20px 5px" }}>
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="number"
                placeholder="Phone Number *"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phoneNumber: e.target.value,
                  })
                }
              />
              <label for="" style={{ fontWeight: 400, margin: "10px 5px" }}>
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="password"
                placeholder="Password *"
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
              <button
                style={{ marginTop: 30 }}
                type="submit"
                onClick={handleSubmitRegister}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
