import "./navbar.css";
import { navBarList } from "../../../constants";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <nav class="navbar">
      <div class="links">
        {navBarList.map((item) => (
          <a href="" key={item._id}>
            <NavLink
              to={item.link}
              state={{ data: location.pathname.split("/")[1] }}
              // onClick={() => setSidenav(false)}
            >
              {item.title}
            </NavLink>
          </a>
        ))}
      </div>
      <div class="navbar-support">
        <i
          class="fa-solid fa-phone"
          style={{
            color: "var(--grey-bolder)",
            fontSize: 30,
            paddingRight: 10,
          }}
        ></i>
        <span style={{ paddingRight: 10 }}>24/7 Support</span>
        <span style={{ color: "var(--hover-color)" }}>(877) 834 1434</span>
      </div>
    </nav>
  );
}
