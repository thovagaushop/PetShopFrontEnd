import { Link, NavLink, useLocation } from "react-router-dom";
import "./index.css";
import { logoMainHeader } from "../../../assets/images";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import instance from "../../../api/axios";
import { login, logout } from "../../../redux/orebiSlice";

export default function MainHeader() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const formRef = useRef(null);
  const location = useLocation();
  const products = useSelector((state) => state.orebiReducer.products);
  const [authInfo, setAuthInfo] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    type: null,
    content: "",
  });
  const user = useSelector((state) => state.orebiReducer.userInfo);
  const dispatch = useDispatch();

  const handleShowLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleClickOutsideForm = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowLoginForm(false);
    }
  };

  const handleCloseSnack = () => {
    setMessage({ ...message, open: false });
  };

  const handleLogin = async () => {
    try {
      const { data } = await instance.post(`/auth/login`, authInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(login(data));
      setMessage({
        ...message,
        open: true,
        type: "success",
        content: "Login successfully",
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

  const handleLogout = () => {
    dispatch(logout());
    setMessage({
      ...message,
      open: true,
      type: "success",
      content: "Logout successfully",
    });
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideForm);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForm);
    };
  }, []);
  return (
    <header>
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
      <div className="top-header">
        <div className="top-header-element">
          <div className="service">
            <i className="fa-solid fa-location-dot"></i>
            <span>Find a Store</span>
          </div>
          <div className="service">
            <i className="fa-solid fa-truck"></i>
            <span>Order Tracking</span>
          </div>
        </div>
        <div className="top-header-element">
          <div className="sale-value">15% Off</div>
          <div className="sale-content">
            $50+ when you buy online & pick up in-store
          </div>
        </div>
        <div className="top-header-element">
          <div className="currency">USD</div>
          <div className="language">English</div>
        </div>
      </div>

      <div className="main-header">
        <NavLink to={"/"} state={{ data: location.pathname.split("/")[1] }}>
          <img src={logoMainHeader} alt="" />
        </NavLink>
        <div className="main-header-search">
          <input type="text" placeholder="Search for products..." />
          <button>
            <i
              className="fa-solid fa-search"
              style={{ color: "white", fontSize: "18" }}
            ></i>
          </button>
        </div>
        <div className="main-header-commit">
          <div className="commit-element">
            <i className="fa-solid fa-gift"></i>
            <div>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>
                Free Shipping
              </div>
              <div style={{ fontSize: 12, color: "#666666" }}>
                Details & Restrictions
              </div>
            </div>
          </div>
          <div className="commit-element">
            <i className="fa-solid fa-circle-check"></i>
            <div>
              <div style={{ fontSize: 14, fontWeight: "bold" }}>
                100% Satisfaction
              </div>
              <div style={{ fontSize: 12, color: "#666666" }}>
                30 Days no hassle
              </div>
            </div>
          </div>
        </div>
        <div className="main-header-information">
          <div className="dropdown">
            <i className="fa-solid fa-user" onClick={handleShowLoginForm}></i>
            {showLoginForm && (
              <div ref={formRef} className="dropdown-content">
                {!user.token ? (
                  <div className="account-inner">
                    <div className="login-form-head">
                      <div className="signin">Sign in</div>
                      <NavLink to={"/auth"}>
                        <span className="Create">Create an Account</span>
                      </NavLink>
                    </div>
                    <form action="">
                      <label for="">
                        Username or email <span>*</span>
                      </label>
                      <input
                        className="inputs"
                        type="text"
                        placeholder="Username"
                        onChange={(e) =>
                          setAuthInfo({ ...authInfo, email: e.target.value })
                        }
                      />
                      <label for="">
                        Password <span>*</span>
                      </label>
                      <input
                        className="inputs"
                        type="password"
                        placeholder="Password"
                        onChange={(e) =>
                          setAuthInfo({ ...authInfo, password: e.target.value })
                        }
                      />
                    </form>
                    <button onClick={handleLogin}>LOGIN</button>
                    <NavLink>
                      <div className="lost" href="">
                        Lost your password?
                      </div>
                    </NavLink>
                  </div>
                ) : (
                  <div className="account-inner flex flex-col items-center gap-5">
                    <div>Hello {user.email}</div>
                    <hr className="w-[80px]" />
                    <div className="w-[100%] py-[5px] flex justify-around hover:bg-[var(--hover-color)] hover:text-white hover:cursor-pointer">
                      <div>Profile</div>
                      <i className="fa-regular fa-address-card"></i>
                    </div>
                    <div
                      className="w-[100%] py-[5px] flex justify-around hover:bg-[var(--hover-color)] hover:text-white hover:cursor-pointer"
                      onClick={handleLogout}
                    >
                      <div>Logout</div>
                      <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="information-icon">
            <i className="fa-solid fa-heart"></i>
            <span className="count">0</span>
          </div>
          <Link to="/cart">
            <div className="information-icon">
              <i className="fa-solid fa-cart-shopping"></i>
              <span className="count">
                {products.length ? products.length : 0}
              </span>
            </div>
          </Link>
          <span style={{ fontSize: 14, fontWeight: "bold" }}>$ 0.00</span>
        </div>
      </div>
    </header>
  );
}
