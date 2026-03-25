import { NavLink, useNavigate } from "react-router-dom";
import w6NavbarCss from "./w6Navbar.module.css";
import logo from "@/assets/sugarIsland/sugarland_logo_header.png";
import pdlist from "@/assets/sugarIsland/sugarland_pdlist22.png";
import cart from "@/assets/sugarIsland/sugarland_cart22.png";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../store";

export default function W5Navbar({ basePath = "/week6" }) {
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
    navigate(basePath);
  };
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-light sticky-top py-1 ${w6NavbarCss.navbarBg}`}
      >
        <div className="container-fluid">
          <div className={w6NavbarCss.header}>
            <NavLink to={basePath} className={`navbar-brand`}>
              <img src={logo} alt="logo" className={w6NavbarCss.logo} />
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
              className={`navbar-nav ms-lg-auto me-lg-4 ${w6NavbarCss.navList}`}
            >
              <li className={`nav-item me-3 ${w6NavbarCss.navItem}`}>
                <NavLink
                  to={`${basePath}/pdlist`}
                  className={`nav-link rounded ${w6NavbarCss.navbarText}`}
                  onClick={handleNavClick}
                >
                  <img
                    src={pdlist}
                    alt="產品列表"
                    className={w6NavbarCss.logo}
                  />
                </NavLink>
              </li>
              <li className="nav-item me-3">
                <NavLink
                  to={`${basePath}/cart`}
                  className={`nav-link rounded ${w6NavbarCss.navbarText}`}
                  onClick={handleNavClick}
                >
                  <div className={w6NavbarCss.cartBtn}>
                    <img src={cart} alt="購物車" className={w6NavbarCss.logo} />
                    <span
                      className={`badge rounded-pill ${w6NavbarCss.cartSpan}`}
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
                      to={`${basePath}/admin/products`}
                      className={`nav-link rounded px-3 ${w6NavbarCss.navbarText}`}
                    >
                      <div className={`${w6NavbarCss.cartBtn}`}>
                        <span
                          className={`rounded-pill ${w6NavbarCss.navbarText} `}
                        >
                          管理產品
                        </span>
                      </div>
                    </NavLink>
                    <button
                      className={` btn ${w6NavbarCss.navbarText} ${w6NavbarCss.cartBtn}`}
                      onClick={handleLogout}
                    >
                      登出
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to={`${basePath}/login`}
                    className={`nav-link rounded px-3 ${w6NavbarCss.navbarText}`}
                    onClick={handleNavClick}
                  >
                    <div className={w6NavbarCss.cartBtn}>
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
