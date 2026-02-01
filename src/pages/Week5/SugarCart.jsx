import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../../store";
import W5Navbar from "@/components/W5Navbar";
import style from "./sugarCart.module.css";

function SugarCart() {
  const [state, dispatch] = useContext(CartContext);

  const handleAddQty = (id) => {
    dispatch({
      type: "ADD_QTY",
      payload: { id },
    });
  };

  const handleSubQty = (id) => {
    dispatch({
      type: "SUB_QTY",
      payload: { id },
    });
  };

  const handleRemove = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id },
    });
  };

  return (
    <>
      <W5Navbar />
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
          <table className="table table-hover table-bordered">
            <thead className={style.tableBg}>
              <tr className="text-center align-middle">
                <th>產品圖</th>
                <th>產品名稱</th>
                <th>原價</th>
                <th>售價</th>
                <th>數量</th>
                <th>總價</th>
                <th>刪除</th>
              </tr>
            </thead>
            <tbody>
              {state.cartList.map((item) => (
                <tr key={item.id} className="text-center align-middle">
                  <td className={style.pdPhoto}>
                    <img
                      src={item.imageUrl}
                      alt={`${item.title}圖片`}
                      className="w-100"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td className="text-black-50">
                    <del>{item.originPrice}</del>
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <button
                      className={`btn btn-sm ${style.btn}`}
                      onClick={() => handleSubQty(item.id)}
                    >
                      -
                    </button>
                    <span
                      className={`text-center px-2 ${style.calculateInput}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className={`btn btn-sm ${style.btn}`}
                      onClick={() => handleAddQty(item.id)}
                    >
                      +
                    </button>
                  </td>
                  <td>
                    <span className="text-center">
                      {item.price * item.quantity}
                    </span>
                  </td>
                  <td>
                    <button
                      className={` btn btn-sm ${style.btn}`}
                      onClick={() => handleRemove(item.id)}
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="text-end fw-bold">
                  總金額
                </td>
                <td colSpan={2} className="text-start ps-4">
                  ${state.totalPrice}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default SugarCart;
