import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <>
      <h2 className="p-2 fw-bold text-center my-5"> 404 </h2>

      <NavLink
        to="/"
        className="btn btn-secondary btn-outline-light rounded-pill px-4"
      >
        返回首頁
      </NavLink>
    </>
  );
}

export default NotFound;
