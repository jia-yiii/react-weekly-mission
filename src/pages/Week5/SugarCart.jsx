import W5Navbar from "@/components/W5Navbar";
import week5Css from "@/pages/Week5/week5.module.css";

function SugarCart() {
  return (
    <>
      <W5Navbar />
      <div className="container">
        <div className="my-5"> </div>
        <table className="table table-hover table-bordered">
          <thead>
            <tr className="table-warning text-center align-middle">
              <th>產品名稱</th>
              <th>原價</th>
              <th>售價</th>
              <th>數量</th>
              <th>刪除</th>
            </tr>
          </thead>
          <tbody>
            {/* {products.map((item) => ( */}
            <tr className="text-center align-middle">
              <td>產品名稱</td>
              <td>原價</td>
              <td>售價</td>
              <td>數量</td>
              <td>
                <button
                  className="btn btn-primary btn-hover"
                  // onClick={() => setTempProduct(item)}
                >
                  查看細節
                </button>
              </td>
            </tr>
            {/* ))} */}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default SugarCart;
