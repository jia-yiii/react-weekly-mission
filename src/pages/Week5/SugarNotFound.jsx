import { NavLink } from "react-router-dom";
import Navbar from "../../components/w5Navbar";

function SugarNotFound() {
  return (
    <>
      <Navbar />
      <h2 className="p-2 fw-bold text-center my-5"> 404 </h2>
      <p className="my-5">這裡沒有好吃的蛋糕 😢</p>

      <NavLink
        to="/sugarIsland/pdlist"
        className="btn btn-secondary btn-outline-light rounded-pill px-4"
      >
        返回糖嶼
      </NavLink>
    </>
  );
}

export default SugarNotFound;
