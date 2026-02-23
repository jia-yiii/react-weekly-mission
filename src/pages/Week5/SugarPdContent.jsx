import { useParams, NavLink } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThreeDots } from "react-loader-spinner";

import axios from "axios";
import W5Navbar from "@/components/W5Navbar";
import styles from "./sugarPdContent.module.css";
import cartIcon from "@/assets/sugarIsland/cart_icon2.png";
import { CartContext } from "../../store";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function SugarPdContent() {
  const { id } = useParams();
  const { state, actions } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/api/${API_PATH}/product/${id}`,
        );
        const p = res.data.product;
        setProduct(p);
        const firstExtra = p?.imagesUrl?.filter(Boolean)?.[0];
        setCurrentImage(p?.imageUrl || firstExtra || "");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (!product)
    return (
      <>
        <W5Navbar />
        <div className="container py-5 d-flex justify-content-center">
          <ThreeDots height="80" width="80" color="#ba9787" />
        </div>
      </>
    );
  const allPdPhotos = [
    product.imageUrl,
    ...(product.imagesUrl?.filter(Boolean) || []),
  ].filter(Boolean);

  const addToCart = (item) => {
    actions.addToCart({
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      originPrice: item.origin_price,
      price: item.price,
      quantity: 1,
    });
  };

  return (
    <>
      <W5Navbar />

      <div className="container">
        <div className="mt-4 ms-4 d-flex justify-content-start">
          <NavLink
            to="/sugarIsland/pdlist"
            className={`btn btn-light rounded px-3 mx-4 ${styles.btn}`}
          >
            回到產品列表
          </NavLink>
        </div>
        <hr />
        <div className="h3 fw-bold mb-3 d-block d-lg-none">{product.title}</div>

        <div className="p-2 mb-4">
          <div className="row align-items-stretch">
            <div className="col-12 col-lg-5 mb-4 mb-lg-0 h-100">
              <div className={styles.gallery}>
                {/* 大圖區 */}
                <div className={styles.main}>
                  <div className={`m-1 ${styles.mainImageWrapper}`}>
                    <img
                      src={currentImage}
                      alt="商品瀏覽圖"
                      className={styles.mainImage}
                    />
                  </div>
                </div>

                {/* 小圖 */}
                <div className={styles.small}>
                  {allPdPhotos.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className={styles.smallGallery}
                      onClick={() => setCurrentImage(url)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") setCurrentImage(url);
                      }}
                    >
                      <img src={url} alt={`圖 ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-7 ">
              <div className="card mb-3 h-100">
                <div className="card-body px-5 pb-3">
                  <h5 className="card-title mb-4">
                    {product.title}
                    <span className="badge bg-primary ms-2">
                      {product.category}
                    </span>
                  </h5>
                  <div className="d-flex flex-column h-100">
                    <div>
                      <p className="card-text text-start">
                        商品描述：
                        <br />
                        {product.description}
                      </p>
                      <p className="card-text text-start">
                        商品
                        {product.content}
                      </p>
                      <div className="d-flex">
                        商品價格：
                        <p className="card-text text-secondary">
                          <del>{product.origin_price}元</del>
                        </p>
                        ｜{product.price} 元
                      </div>
                    </div>
                    <div
                      className={`btn btn-light ${styles.btn} mt-auto mb-5`}
                      onClick={() => {
                        addToCart(product);
                      }}
                    >
                      <img
                        src={cartIcon}
                        alt="cartIcon"
                        className={styles.cartIcon}
                      />
                      加入購物車
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </div>
    </>
  );
}

export default SugarPdContent;
