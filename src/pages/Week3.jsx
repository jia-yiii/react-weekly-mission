import { useState, useEffect, useRef } from "react";
import axios from "axios";
import * as bootstrap from "bootstrap";
import week3Css from "./week3.module.css";

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

function Week3() {
  const productModalRef = useRef(null);
  const modalElRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);

  const [tempPD, setTempPd] = useState(defaultPd);
  const [isLoading, setIsLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [newImageUrl, setNewImageUrl] = useState("");

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products/`,
      );
      setProducts(res.data.products);
    } catch (err) {
      if (err?.response?.status === 401) {
        setIsAuth(false);
      }
    }
  };

  const checkAdmin = async () => {
    setIsLoading(true);
    try {
      await axios.post(`${API_BASE}/api/user/check`);
      setIsAuth(true);
      getProduct().finally(() => setIsLoading(false));
    } catch (err) {
      setIsAuth(false);
      setIsLoading(false);
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common.Authorization = token;
    productModalRef.current = new bootstrap.Modal(modalElRef.current, {
      keyboard: false,
    });
    checkAdmin();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/admin/signin`, formData);
      const { token, expired } = response.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
      axios.defaults.headers.common.Authorization = token;
      setIsLoading(true);
      setIsAuth(true);
      await getProduct();
    } catch (error) {
      alert("登入失敗: " + error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

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
      productModalRef.current.hide();
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
    productModalRef.current.show();
  };

  const editProduct = (item) => {
    setIsNew(false);
    setTempPd({
      ...item,
      imageUrl: item.imageUrl || "",
      imagesUrl: item.imagesUrl || [],
    });
    productModalRef.current.show();
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
    productModalRef.current.hide();
  };

  return (
    <>
      {isAuth ? (
        isLoading ? (
          <div className="text-center py-5">
            <p className="fs-5"> 載入產品中... </p>
          </div>
        ) : (
          <div>
            <div className="container">
              <div className="text-end mt-4">
                <button className="btn btn-primary" onClick={createNew}>
                  建立新的產品
                </button>
              </div>
              <table className="table table-hover mt-4">
                <thead>
                  <tr className="table-primary text-center align-middle">
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                    <th width="120">原價</th>
                    <th width="120">售價</th>
                    <th width="100">是否啟用</th>
                    <th width="120">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
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
          </div>
        )
      ) : (
        <div className={`container ${week3Css.login}`}>
          <div className="row justify-content-center">
            <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
            <div className="col-8">
              <form
                id="form"
                className={week3Css.formSignin}
                onSubmit={handleSubmit}
              >
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    placeholder="name@example.com"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoFocus
                  />
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button
                  className="btn btn-lg btn-primary w-100 mt-3"
                  type="submit"
                >
                  登入
                </button>
              </form>
            </div>
          </div>
          <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
        </div>
      )}
      <div
        id="productModal"
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="productModalLabel"
        aria-hidden="true"
        ref={modalElRef}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content border-0">
            <div className="modal-header bg-dark text-white">
              <h5 id="productModalLabel" className="modal-title">
                {isNew ? <span>新增產品</span> : <span>編輯產品</span>}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                aria-label="Close"
                onClick={cancelSubmit}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-sm-4">
                  <div className="mb-2">
                    <div className="mb-3">
                      <label htmlFor="imageUrl" className="form-label fw-bold">
                        請輸入主要圖片網址
                      </label>
                      <input
                        id="imageUrl"
                        type="text"
                        className="form-control"
                        placeholder="請輸入主要圖片連結"
                        value={tempPD.imageUrl}
                        onChange={handleTempPdChange}
                      />
                    </div>
                    {tempPD.imageUrl && (
                      <img
                        className={`img-fluid ${week3Css.editImages}`}
                        src={tempPD.imageUrl}
                        alt="主圖"
                      />
                    )}
                  </div>

                  <hr />
                  {/* 更多圖片區 */}
                  <div className="mb-3">
                    <label
                      htmlFor="otherImageUrl"
                      className="form-label fw-bold"
                    >
                      輸入其他圖片網址（最多 5 張）
                    </label>

                    <div className="input-group">
                      <input
                        id="otherImageUrl"
                        type="text"
                        className="form-control"
                        placeholder="請輸入其他圖片連結"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={addOtherImage}
                        disabled={
                          (Array.isArray(tempPD.imagesUrl)
                            ? tempPD.imagesUrl.length
                            : 0) >= 5
                        }
                      >
                        新增
                      </button>
                    </div>
                  </div>

                  {/* 圖片清單 */}
                  <div className="row g-3">
                    {(Array.isArray(tempPD.imagesUrl)
                      ? tempPD.imagesUrl
                      : []
                    ).map((url, idx) => (
                      <div key={`${url}-${idx}`} className="col-6">
                        <div className="border rounded p-2">
                          <img
                            className={`img-fluid mb-2 ${week3Css.editImages}`}
                            src={url}
                            alt={`更多圖片-${idx + 1}`}
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="請輸入圖片連結"
                            value={url}
                            readOnly
                          />
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm w-100"
                            onClick={() => removeOtherImage(idx)}
                          >
                            刪除這張
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-sm-8">
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">
                      標題
                    </label>
                    <input
                      id="title"
                      type="text"
                      className="form-control"
                      placeholder="請輸入標題"
                      value={tempPD.title}
                      onChange={handleTempPdChange}
                    />
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label htmlFor="category" className="form-label fw-bold">
                        分類
                      </label>
                      <input
                        id="category"
                        type="text"
                        className="form-control"
                        placeholder="請輸入分類"
                        value={tempPD.category}
                        onChange={handleTempPdChange}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="unit" className="form-label fw-bold">
                        單位
                      </label>
                      <input
                        id="unit"
                        type="text"
                        className="form-control"
                        placeholder="請輸入單位"
                        value={tempPD.unit}
                        onChange={handleTempPdChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="mb-3 col-md-6">
                      <label
                        htmlFor="origin_price"
                        className="form-label fw-bold"
                      >
                        原價
                      </label>
                      <input
                        id="origin_price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入原價"
                        value={tempPD.origin_price}
                        onChange={handleTempPdChange}
                      />
                    </div>
                    <div className="mb-3 col-md-6">
                      <label htmlFor="price" className="form-label fw-bold">
                        售價
                      </label>
                      <input
                        id="price"
                        type="number"
                        min="0"
                        className="form-control"
                        placeholder="請輸入售價"
                        value={tempPD.price}
                        onChange={handleTempPdChange}
                      />
                    </div>
                  </div>
                  <hr />

                  <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">
                      產品描述
                    </label>
                    <textarea
                      id="description"
                      className="form-control"
                      placeholder="請輸入產品描述"
                      value={tempPD.description}
                      onChange={handleTempPdChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-bold">
                      說明內容
                    </label>
                    <textarea
                      id="content"
                      className="form-control"
                      placeholder="請輸入說明內容"
                      value={tempPD.content}
                      onChange={handleTempPdChange}
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <div className="form-check text-start">
                      <input
                        id="is_enabled"
                        className="form-check-input"
                        type="checkbox"
                        checked={!!tempPD.is_enabled}
                        onChange={handleTempPdChange}
                      />
                      <label
                        className="form-check-label fw-bold"
                        htmlFor="is_enabled"
                      >
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-secondary"
                // data-bs-dismiss="modal"
                onClick={cancelSubmit}
              >
                取消
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={submitProduct}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Week3;
