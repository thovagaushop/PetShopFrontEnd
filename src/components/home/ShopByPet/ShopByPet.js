import React from "react";
import {
  cat,
  dog,
  fish,
  pawSolid1,
  pawSolid2,
  smallPet,
} from "../../../assets/images";
import "./shopByPet.css";
import { useNavigate } from "react-router-dom";

export default function ShopByPet() {
  const navigate = useNavigate();
  const handleClick = (e) => {
    const petType = e.currentTarget.querySelector(".type-name").textContent;
    navigate(`/shop?pet=${petType}`);
  };
  return (
    <section className="shop-pet-type">
      <div className="pet-type-title">
        <div className="text">
          <div>Shop By Pet</div>
          <img className="paw1" src={pawSolid1} alt="" />
          <img className="paw2" src={pawSolid2} alt="" />
        </div>
        <div className="icons">
          <button>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
      <div className="pet-type">
        <div className="element" onClick={handleClick}>
          <div className="content">
            <img src={dog} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
                id="senior-dog"
                style={{ fontSize: 14, fontWeight: "bold" }}
              >
                Senior Dog
              </div>
              <div style={{ fontSize: 12, color: "var(--grey-bolder)" }}>
                3 products
              </div>
            </div>
          </div>
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="element" onClick={handleClick}>
          <div className="content">
            <img src={cat} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
                id="cat"
                style={{ fontSize: 14, fontWeight: "bold" }}
              >
                Cat
              </div>
              <div style={{ fontSize: 12, color: "var(--grey-bolder)" }}>
                3 products
              </div>
            </div>
          </div>
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="element" onClick={handleClick}>
          <div className="content">
            <img src={fish} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
                id="fish"
                style={{ fontSize: 14, fontWeight: "bold" }}
              >
                Fish
              </div>
              <div style={{ fontSize: 12, color: "var(--grey-bolder)" }}>
                3 products
              </div>
            </div>
          </div>
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
        <div className="element" onClick={handleClick}>
          <div className="content">
            <img src={smallPet} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
                id="small-pet"
                style={{ fontSize: 14, fontWeight: "bold" }}
              >
                Small Pet
              </div>
              <div style={{ fontSize: 12, color: "var(--grey-bolder)" }}>
                3 products
              </div>
            </div>
          </div>
          <button>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
