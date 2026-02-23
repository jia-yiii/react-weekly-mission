import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);
  const handleNavClick = () => setIsOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ">
        <NavLink to="/">首頁</NavLink>
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse${isOpen ? " show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week1" onClick={handleNavClick}>
                第 1 週
              </NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week2" onClick={handleNavClick}>
                第 2 週
              </NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week3" onClick={handleNavClick}>
                第 3 週
              </NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week4" onClick={handleNavClick}>
                第 4 週
              </NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/sugarIsland" onClick={handleNavClick}>
                第 5-6 週
              </NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week7" onClick={handleNavClick}>
                第 7 週
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
