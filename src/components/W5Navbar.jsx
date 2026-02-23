import { NavLink, useNavigate } from "react-router-dom";
import w5NavbarCss from "./w5Navbar.module.css";
import logo from "@/assets/sugarIsland/sugarland_logo_header.png";
import pdlist from "@/assets/sugarIsland/sugarland_pdlist22.png";
import cart from "@/assets/sugarIsland/sugarland_cart22.png";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../store";

export default function W5Navbar() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleNavClick = () => setIsOpen(false);
  const { state, actions } = useContext(CartContext);
  const totalQty = state.cartList.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    setIsAuth(!!token);
  }, []);

  const handleLogout = () => {
    document.cookie = "hexToken=; max-age=0; path=/;";
    setIsAuth(false);
    actions.clearCart();
    navigate("/sugarIsland");
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top py-1 ${w5NavbarCss.navbarBg}`}
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
            aria-controls="w5navbarNav"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            onClick={handleToggle}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            id="w5navbarNav"
            className={`collapse navbar-collapse align-items-center${
              isOpen ? " show" : ""
            }`}
          >
            <ul
              className={`navbar-nav ms-lg-auto me-lg-4 ${w5NavbarCss.navList}`}
            >
              <li className={`nav-item me-3 ${w5NavbarCss.navItem}`}>
                <NavLink
                  to="/sugarIsland/pdlist"
                  className={`nav-link rounded ${w5NavbarCss.navbarText}`}
                  onClick={handleNavClick}
                >
                  <img
                    src={pdlist}
                    alt="產品列表"
                    className={w5NavbarCss.logo}
                  />
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  to="/sugarIsland/cart"
                  className={`nav-link rounded ${w5NavbarCss.navbarText}`}
                  onClick={handleNavClick}
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
              <li className="nav-item me-3 d-flex align-items-center">
                {isAuth ? (
                  <div className="d-flex">
                    <NavLink
                      to="/sugarIsland/admin/products"
                      className={`nav-link rounded px-3 ${w5NavbarCss.navbarText}`}
                    >
                      <div className={`${w5NavbarCss.cartBtn}`}>
                        <span
                          className={`rounded-pill ${w5NavbarCss.navbarText} `}
                        >
                          管理產品
                        </span>
                      </div>
                    </NavLink>
                    <button
                      className={` btn ${w5NavbarCss.navbarText} ${w5NavbarCss.cartBtn}`}
                      onClick={handleLogout}
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/sugarIsland/login"
                    className={`nav-link rounded px-3 ${w5NavbarCss.navbarText}`}
                    onClick={handleNavClick}
                  >
                    <div className={w5NavbarCss.cartBtn}>
                      <i className="bi bi-box-arrow-in-right px-2"></i>
                      <span className={`rounded-pill`}>登入</span>
                    </div>
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
