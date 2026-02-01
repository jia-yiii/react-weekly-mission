import { NavLink } from "react-router-dom";
import w5NavbarCss from "./w5Navbar.module.css";
import logo from "@/assets/sugarIsland/sugarland_logo_header.png";
import pdlist from "@/assets/sugarIsland/sugarland_pdlist22.png";
import cart from "@/assets/sugarIsland/sugarland_cart22.png";
import { useContext } from "react";
import { CartContext } from "../store";

export default function W5Navbar() {
  const [state] = useContext(CartContext);
  const totalQty = state.cartList.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg sticky-top py-1 ${w5NavbarCss.navbarBg}`}
      >
        <div className="container-fluid">
          <div className={w5NavbarCss.header}>
            <NavLink to="/sugarIsland" className={`navbar-brand`}>
              <img src={logo} alt="logo" className={w5NavbarCss.logo} />
            </NavLink>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse align-items-center">
            <ul className="navbar-nav  ms-auto me-4">
              <li className="nav-item me-3">
                <NavLink
                  to="/sugarIsland/pdlist"
                  className={`nav-link rounded ${w5NavbarCss.navbarText}`}
                >
                  <img
                    src={pdlist}
                    alt="產品列表"
                    className={w5NavbarCss.logo}
                  />
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/sugarIsland/cart"
                  className={`nav-link rounded ${w5NavbarCss.navbarText}`}
                >
                  <div className={w5NavbarCss.cartBtn}>
                    <img src={cart} alt="購物車" className={w5NavbarCss.logo} />
                    <span
                      className={`badge rounded-pill ${w5NavbarCss.cartSpan}`}
                    >
                      {totalQty === 0 ? "" : totalQty}
                    </span>
                  </div>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
