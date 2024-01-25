import { Link, NavLink, useLocation } from "react-router-dom";
import "./index.css";
import { logoMainHeader } from "../../../assets/images";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function MainHeader() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const formRef = useRef(null);
  const location = useLocation();
  const products = useSelector((state) => state.orebiReducer.products);

  const handleShowLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  const handleClickOutsideForm = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setShowLoginForm(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideForm);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideForm);
    };
  }, []);
  return (
    <header>
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
                <div class="account-inner">
                  <div class="login-form-head">
                    <div class="signin">Sign in</div>
                    <NavLink to={"/auth"}>
                      <a class="Create" href="">
                        Create an Account
                      </a>
                    </NavLink>
                  </div>
                  <form action="">
                    <label for="">
                      Username or email <span>*</span>
                    </label>
                    <input class="inputs" type="text" placeholder="Username" />
                    <label for="">
                      Passwork <span>*</span>
                    </label>
                    <input class="inputs" type="text" placeholder="Passwork" />
                  </form>
                  <button>LOGIN</button>
                  <a class="lost" href="">
                    Lost your passwork?
                  </a>
                </div>
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
