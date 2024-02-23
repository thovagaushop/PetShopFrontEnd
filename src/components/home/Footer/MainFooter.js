import "./mainFooter.css";
import {
  appStore,
  googlePlay,
  payService,
  logoMainHeader,
} from "../../../assets/images";

export default function MainFooter() {
  return (
    <footer>
      <div className="footer">
        <div className="footer1">
          <div>
            <img src={logoMainHeader} alt="" />
          </div>
          <div style={{ width: 263, fontSize: 14, color: "#666666" }}>
            We know pets are like family, so we are committed to providing the
            highest-quality products that you can trust
          </div>
          <div className="phone">
            <div style={{ marginRight: 10, fontSize: 28 }}>
              <i className="fa-solid fa-phone"></i>
            </div>
            <div style={{ fontWeight: "bold" }}>Hotline Order</div>
          </div>
          <div
            style={{
              color: "var(--hover-color)",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            (84) 123 456 789
          </div>

        </div>

        <div className="footer2">
          <div
            style={{ fontSize: 14, fontWeight: "bold", paddingBottom: 40 }}
            className="footer-element-title"
          >
            USEFUL LINKS
          </div>
          <div style={{ fontSize: 14, color: "#666666" }}>
            <p className="footer-element">New Products</p>
            <p className="footer-element">Best Sellers</p>
            <p className="footer-element">Bundle & Save</p>
            <p className="footer-element">Online Gift Card</p>
            <p className="footer-element">Discount</p>
            <p className="footer-element">Pet Store Locator</p>
          </div>
        </div>

        <div className="footer2">
          <div
            style={{ fontSize: 14, fontWeight: "bold", paddingBottom: 40 }}
            className="footer-element-title"
          >
            MY ACCOUNT
          </div>
          <div style={{ fontSize: 14, color: "#666666" }}>
            <p className="footer-element">My Profile</p>
            <p className="footer-element">My Order History</p>
            <p className="footer-element">My Wish List</p>
            <p className="footer-element">Order Tracking</p>
            <p className="footer-element">Shipping Info</p>
            <p className="footer-element">Shopping Cart</p>
          </div>
        </div>

        <div className="footer2">
          <div
            style={{ fontSize: 14, fontWeight: "bold", paddingBottom: 40 }}
            className="footer-element-title"
          >
            COMPANY
          </div>
          <div style={{ fontSize: 14, color: "#666666" }}>
            <p className="footer-element">About Us</p>
            <p className="footer-element">Careers</p>
            <p className="footer-element">Blog</p>
            <p className="footer-element">Affiliate</p>
            <p className="footer-element">Contact Us</p>
            <p className="footer-element">Gift Cards</p>
          </div>
        </div>


      </div>
      <hr style={{ border: "1px solid #E5E5E5", width: 90 }} />
      <div className="footer-last" style={{ color: "#666" }}>
        <div>
          Copyright <i className="fa-regular fa-copyright"></i> 2022{" "}
          <span style={{ color: "black" }}>Ziggy</span>. All rights reserved
        </div>

        <div style={{ display: "flex", alignItem: "center" }}>
          <div>Privacy & Cookie Policy</div>
          <hr
            style={{
              borderLeft: "1px solid #666",
              height: 15,
              margin: "0px 15px 0px 15px",
            }}
          />
          <div>Terms of Service</div>
        </div>
      </div>
    </footer>
  );
}
