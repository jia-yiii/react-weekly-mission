import { useState, useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import * as bootstrap from "bootstrap";
import week4Css from "../week4.module.css";
import ProductModal from "../../components/ProductModal";
import Pagination from "../../components/Pagination";
import W5Navbar from "../../components/W5Navbar";
import style from "./adminProducts.module.css";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;
const defaultPd = {
  category: "",
  content: "",
  description: "",
  id: "",
  imageUrl: "",
  imagesUrl: [],
  is_enabled: 0,
  origin_price: 0,
  price: 0,
  title: "",
  unit: "",
  num: 0,
};

function AdminProducts() {
  const productModalRef = useRef(null);
  const modalElRef = useRef(null);
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);

  const [tempPD, setTempPd] = useState(defaultPd);
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products/`,
      );
      setProducts(res.data.products);
      setCurrentPage(1);
    } catch (err) {
      if (err?.response?.status === 401) {
        setIsAuth(false);
      }
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common.Authorization = token;
    if (modalElRef.current) {
      productModalRef.current = new bootstrap.Modal(modalElRef.current, {
        keyboard: false,
      });
    }

    if (token) {
      setIsLoading(true);
      getProduct().finally(() => setIsLoading(false));
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleTempPdChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTempPd((prev) => ({
      ...prev,
      [id]:
        type === "checkbox"
          ? checked
            ? 1
            : 0
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const submitProduct = async () => {
    try {
      const payload = {
        data: {
          ...tempPD,
          imagesUrl: Array.isArray(tempPD.imagesUrl) ? tempPD.imagesUrl : [],
          is_enabled: tempPD.is_enabled ? 1 : 0,
        },
      };

      if (isNew) {
        await axios.post(`${API_BASE}/api/${API_PATH}/admin/product`, payload);
      } else {
        await axios.put(
          `${API_BASE}/api/${API_PATH}/admin/product/${tempPD.id}`,
          payload,
        );
      }
      productModalRef.current?.hide();
      setTempPd(defaultPd);
      setNewImageUrl("");
      await getProduct();
    } catch (err) {
      alert(err?.response?.data?.message || "更新失敗");
    }
  };

  const deleteProduct = async (item) => {
    if (!window.confirm(`確定要刪除「${item.title}」嗎？`)) return;

    await axios.delete(`${API_BASE}/api/${API_PATH}/admin/product/${item.id}`);
    await getProduct();
  };

  const createNew = () => {
    setIsNew(true);
    setTempPd(defaultPd);
    productModalRef.current?.show();
  };

  const editProduct = (item) => {
    setIsNew(false);
    setTempPd({
      ...item,
      imageUrl: item.imageUrl || "",
      imagesUrl: item.imagesUrl || [],
    });
    productModalRef.current?.show();
  };

  const addOtherImage = () => {
    const url = newImageUrl.trim();
    if (!url) return;

    setTempPd((prev) => {
      const list = Array.isArray(prev.imagesUrl) ? prev.imagesUrl : [];
      if (list.length >= 5) {
        alert("最多只能新增 5 張其他圖片");
        return prev;
      }
      if (list.includes(url)) return prev;
      return {
        ...prev,
        imagesUrl: [...list, url],
      };
    });

    setNewImageUrl("");
  };

  const removeOtherImage = (idx) => {
    setTempPd((prev) => {
      const list = Array.isArray(prev.imagesUrl) ? prev.imagesUrl : [];
      return {
        ...prev,
        imagesUrl: list.filter((_, i) => i !== idx),
      };
    });
  };

  const cancelSubmit = () => {
    setTempPd(defaultPd);
    setNewImageUrl("");
    productModalRef.current?.hide();
  };

  const totalPages = Math.ceil(products.length / pageSize) || 1;

  const pagedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  return (
    <>
      <W5Navbar />
      <div className={`d-flex align-items-center ${style.header}`}>
        <div className={`flex-fill ${style.headerBanner}`}>
          <br />
          <p className={`text-center h2 ${style.headerText}`}>產品管理</p>
          <br />
        </div>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center py-5">
          <ThreeDots height="80" width="80" color="#ba9787" />
        </div>
      ) : (
        <div>
          <div className="container">
            <div className="text-start mt-4">
              <button
                className={`btn btn-light ${style.btn}`}
                onClick={createNew}
              >
                建立新的產品
              </button>
            </div>
            <table className="table table-hover mt-4">
              <thead>
                <tr className={`${style.tableTr} text-center align-middle`}>
                  <th width="120">分類</th>
                  <th>產品名稱</th>
                  <th width="120">原價</th>
                  <th width="120">售價</th>
                  <th width="100">是否啟用</th>
                  <th width="120">編輯</th>
                </tr>
              </thead>
              <tbody>
                {pagedProducts.map((item) => (
                  <tr key={item.id} className="text-center align-middle">
                    <td>{item.category}</td>
                    <td>{item.title}</td>
                    <td>{item.origin_price}</td>
                    <td>{item.price}</td>
                    <td>
                      {item.is_enabled ? (
                        <span className="text-success">啟用</span>
                      ) : (
                        <span>未啟用</span>
                      )}
                    </td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={() => editProduct(item)}
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteProduct(item)}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
      <ProductModal
        ref={modalElRef}
        isNew={isNew}
        tempPD={tempPD}
        newImageUrl={newImageUrl}
        handleTempPdChange={handleTempPdChange}
        setNewImageUrl={setNewImageUrl}
        addOtherImage={addOtherImage}
        removeOtherImage={removeOtherImage}
        cancelSubmit={cancelSubmit}
        submitProduct={submitProduct}
        imageClassName={week4Css.editImages}
      />
    </>
  );
}

export default AdminProducts;
