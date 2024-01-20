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

export default function ShopByPet() {
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
        <div className="element">
          <div className="content">
            <img src={dog} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
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
        <div className="element">
          <div className="content">
            <img src={cat} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
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
        <div className="element">
          <div className="content">
            <img src={fish} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
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
        <div className="element">
          <div className="content">
            <img src={smallPet} alt="" />
            <div style={{ marginLeft: 20 }}>
              <div
                className="type-name"
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
