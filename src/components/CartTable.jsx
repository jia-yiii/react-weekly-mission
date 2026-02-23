import style from "../pages/Week5/sugarCart.module.css";
export default function CartTable({
  cartList,
  totalPrice,
  handleAddQty,
  handleSubQty,
  handleRemove,
  ui = {
    editableQty: true,
    removable: true,
  },
}) {
  return (
    <table className="table table-hover table-bordered">
      <thead className={style.tableBg}>
        <tr className="text-center align-middle">
          <th>產品圖</th>
          <th>產品名稱</th>
          <th>原價</th>
          <th>售價</th>
          <th>數量</th>
          <th>總價</th>
          {ui.removable && <th>刪除</th>}
        </tr>
      </thead>
      <tbody>
        {cartList.map((item) => {
          return (
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
                <del>$ {item.originPrice}</del>
              </td>
              <td>$ {item.price}</td>

              {ui.editableQty ? (
                <>
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
                </>
              ) : (
                <td>
                  <span className={`text-center px-2`}>{item.quantity}</span>
                </td>
              )}

              <td>
                <span className="text-center">
                  $ {item.price * item.quantity}
                </span>
              </td>

              {ui.removable && (
                <td>
                  <button
                    className={`btn btn-sm ${style.btn}`}
                    onClick={() => handleRemove?.(item.id)}
                  >
                    刪除
                  </button>
                </td>
              )}
            </tr>
          );
        })}
        <tr>
          <td colSpan={5} className="text-end fw-bold">
            總金額
          </td>
          <td colSpan={2} className="text-center fw-bold fs-5 ps-4">
            ${totalPrice}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
