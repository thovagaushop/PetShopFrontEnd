import React, { useState } from "react";
import MainHeader from "../../components/home/Header/MainHeader";
import { useAuth } from "../../components/context/AuthContext";
import instance from "../../api/axios";
import "./auth.css";

export default function Auth() {
  const { dispatch } = useAuth();
  const [registerData, setRegisterData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmitRegister = (e) => {
    e.preventDefault();
    console.log(registerData);
    // const { data } =
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log(loginData);
    const { data } = await instance.post(
      "/auth/login",
      { email: loginData.email, password: loginData.password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const token = data.token;
    dispatch({ type: "LOGIN", payload: { token } });
  };

  return (
    <div>
      <MainHeader />
      <div className="auth-page">
        <div className="parent-text">
          <a href="#$$" className="homepage">
            Home Page
          </a>
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
                    setLoginData({ ...loginData, rememberMe: e.target.checked })
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
              />
              <label for="" style={{ margin: "20px 5px" }}>
                First Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="text"
                placeholder="First Name *"
              />
              <label for="" style={{ margin: "20px 5px" }}>
                Last Name <span style={{ color: "red" }}>*</span>
              </label>
              <input className="inputs" type="text" placeholder="Last Name *" />
              <label for="" style={{ margin: "20px 5px" }}>
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                className="inputs"
                type="number"
                placeholder="Phone Number *"
              />
              <label for="" style={{ fontWeight: 400, margin: "10px 5px" }}>
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input className="inputs" type="text" placeholder="Password *" />
              <button style={{ marginTop: 30 }} type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
