import { banner1 } from "../../assets/images";
import "./banner1.css";

export default function Banner1() {
  return (
    <section className="banner1">
      <img src={banner1} height="auto" width="100%" alt="" />
      <div className="buttons">
        <span>Shop Now</span>
        <button>
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </section>
  );
}
