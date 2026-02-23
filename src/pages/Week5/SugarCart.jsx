import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../store";
import W5Navbar from "@/components/W5Navbar";
import style from "./sugarCart.module.css";
import CartTable from "../../components/CartTable";

function SugarCart() {
  const navigate = useNavigate();
  const { state, actions } = useContext(CartContext);

  const handleAddQty = (id) => {
    actions.addQty({
      id,
    });
  };

  const handleSubQty = (id) => {
    actions.subQty({
      id,
    });
  };

  const handleRemove = (id) => {
    actions.removeItem({
      id,
    });
  };
  const handleCheckout = () => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );

    if (!token) {
      alert("請先登入");
      navigate("/sugarIsland/login");
      return;
    }

    navigate("/sugarIsland/order");
  };

  return (
    <>
      <W5Navbar />
      <div className={`d-flex align-items-center ${style.header}`}>
        <div className={`flex-fill ${style.headerBanner}`}>
          <br />
          <p className={`text-center h2 ${style.headerText}`}>購物車</p>
          <br />
        </div>
      </div>
      <div className="container">
        <div className="my-5"></div>
        <div className="mt-4 ms-4 d-flex justify-content-start">
          <NavLink
            to="/sugarIsland/pdlist"
            className={`btn btn-primary rounded px-3 ${style.btn}`}
          >
            回到產品列表
          </NavLink>
        </div>
        <hr />
        {state.cartList.length === 0 ? (
          "購物車空空的"
        ) : (
          <>
            <CartTable
              cartList={state.cartList}
              totalPrice={state.totalPrice}
              handleAddQty={handleAddQty}
              handleSubQty={handleSubQty}
              handleRemove={handleRemove}
            />
            <div className="mt-4 ms-4 d-flex justify-content-end">
              <button
                className={`btn btn-primary rounded px-5 me-4 ${style.btn}`}
                onClick={handleCheckout}
              >
                前往結帳
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default SugarCart;
