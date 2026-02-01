import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import W5Navbar from "@/components/W5Navbar";
import style from "@/pages/Week5/SugarPdList0.module.css";
import cartIcon from "@/assets/sugarIsland/cart_icon2.png";
import { CartContext } from "../../store";

function SugarPdList() {
  const [state, dispatch] = useContext(CartContext);
  const API_BASE = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);

  const getProduct = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/${API_PATH}/products/all`);
      setProducts(res.data.products);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        originPrice: item.origin_price,
        price: item.price,
        quantity: 1,
      },
    });
  };

  return (
    <>
      <W5Navbar />
      <div className={`d-flex align-items-center ${style.header}`}>
        <div className={`flex-fill ${style.headerBanner}`}>
          <br />
          <p className={`text-center h2 ${style.headerText}`}>Sugar Products</p>
          <br />
        </div>
      </div>
      <div className="container">
        <div className="my-5"></div>
        <div className="row row-cols-2 row-cols-lg-4 g-3">
          {products.map((item) => (
            <div key={item.id} className="col px-2">
              <div className="card">
                <img
                  src={item.imageUrl}
                  className={`card-img-top ${style.cardPhoto}`}
                  alt="Pd_photo"
                />
                <div className="card-body">
                  <h5 className={`card-title text-truncate ${style.cardTitle}`}>
                    {item.title}
                  </h5>
                  <p className="card-text">
                    <span className="card-text text-secondary">
                      <del>{item.origin_price}</del>
                    </span>
                    ｜ <span className="text-danger fw-bold">{item.price}</span>
                    元
                  </p>
                  <div className="d-flex justify-content-center align-items-center">
                    <div
                      className={`btn btn-light me-2 ${style.btn}`}
                      onClick={() => navigate(`/sugarIsland/pdlist/${item.id}`)}
                    >
                      查看細節
                    </div>
                    <div
                      className={`btn btn-light ${style.btn}`}
                      onClick={() => {
                        addToCart(item);
                      }}
                    >
                      <img
                        src={cartIcon}
                        alt="加入購物車"
                        className={style.cartIcon}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="my-3"></div>
        </div>
      </div>
    </>
  );
}

export default SugarPdList;
