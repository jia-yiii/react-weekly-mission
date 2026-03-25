import { useState, useEffect } from "react";
import axios from "axios";
import Week2Css from "./Week2.module.css";
function Week2() {
  const API_BASE = import.meta.env.VITE_API_BASE;
  const API_PATH = import.meta.env.VITE_API_PATH;

  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [tempProduct, setTempProduct] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoading(true);
      setIsAuth(true);
      getProduct().finally(() => setIsLoading(false));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: formData.username,
      password: formData.password,
    };

    try {
      const res = await axios.post(`${API_BASE}/admin/signin`, user);
      const { token } = res.data;
      localStorage.setItem("token", token);
      setIsLoading(true);
      setIsAuth(true);
      await getProduct();
    } catch (err) {
      alert("登入失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const getProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${API_BASE}/api/${API_PATH}/admin/products/`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setProducts(res.data.products);
    } catch (err) {
      if (err?.response?.status === 401) {
        localStorage.removeItem("token");
        setIsAuth(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setFormData({ username: "", password: "" });
    setProducts([]);
    setTempProduct(null);
  };
  return (
    <>
      <h2 className="p-2 fw-bold text-center">第 2 週 - RESTful API 串接</h2>
      <hr />
      {isAuth ? (
        isLoading ? (
          <div className="text-center py-5">
            <p className="fs-5"> 載入產品中... </p>
          </div>
        ) : (
          <div className="row mt-5">
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-4 mb-4"
                onClick={handleLogout}
              >
                登出
              </button>
            </div>
            <div className="col-md-6">
              <h2>產品列表</h2>
              <table className="table table-hover table-bordered">
                <thead>
                  <tr className="table-warning text-center align-middle">
                    <th>產品名稱</th>
                    <th>原價</th>
                    <th>售價</th>
                    <th>是否啟用</th>
                    <th>查看細節</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => (
                    <tr key={item.id} className="text-center align-middle">
                      <td>{item.title}</td>
                      <td>{item.origin_price}</td>
                      <td>{item.price}</td>
                      <td>{item.is_enabled ? "是" : "否"}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-hover"
                          onClick={() => setTempProduct(item)}
                        >
                          查看細節
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              <h2>單一產品細節</h2>
              {tempProduct ? (
                <div className="card mb-3">
                  <img
                    src={tempProduct.imageUrl}
                    className={`card-img-top ${Week2Css.primaryImage}`}
                    alt="主圖"
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {tempProduct.title}
                      <span className="badge bg-primary ms-2">
                        {tempProduct.category}
                      </span>
                    </h5>
                    <p className="card-text text-start">
                      商品描述：
                      <br />
                      {tempProduct.description}
                    </p>
                    <p className="card-text text-start">
                      商品
                      {tempProduct.content}
                    </p>
                    <div className="d-flex">
                      商品價格：
                      <p className="card-text text-secondary">
                        <del>{tempProduct.origin_price}元</del>
                      </p>
                      ｜{tempProduct.price} 元
                    </div>
                    <h5 className="mt-3 text-start">更多圖片：</h5>
                    <div className="d-flex flex-wrap">
                      {tempProduct.imagesUrl
                        ?.filter((url) => url)
                        .map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            className={Week2Css.images}
                            alt="副圖"
                          />
                        ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-secondary">請選擇一個商品查看</p>
              )}
            </div>
          </div>
        )
      ) : (
        <div className={`container ${Week2Css.login}`}>
          <div className="row justify-content-center">
            <h1 className="h3 mb-3 font-weight-normal">請先登入</h1>
            <div className="col-8">
              <form
                id="form"
                className={`${Week2Css.formSignin}`}
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
    </>
  );
}

export default Week2;
