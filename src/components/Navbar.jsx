import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ">
        <NavLink to="/">首頁</NavLink>
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
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week1">第 1 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week2">第 2 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week3">第 3 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week4">第 4 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/sugarIsland">第 5 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week6">第 6 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center">
              <NavLink to="/Week7">第 7 週</NavLink>
            </li>
            <li className="nav-item mx-2 px-2 text-center ">
              <NavLink to="/Week8">第 8 週</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
