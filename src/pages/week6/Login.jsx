import { useState, useEffect, useContext } from "react";
import W5Navbar from "../../components/W6Navbar";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../store";

const API_BASE = import.meta.env.VITE_API_BASE;

function Login() {
  const navigate = useNavigate();
  const { actions } = useContext(CartContext);
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const payload = { username: data.email, password: data.password };
      const res = await axios.post(`${API_BASE}/admin/signin`, payload);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token};expires=${new Date(expired)};path=/;`;
      axios.defaults.headers.common.Authorization = token;
      setIsAuth(true);
      await actions.syncCartAfterLogin();
      await actions.fetchCartFromApi();
      navigate("/week6/admin/products");
    } catch (error) {
      const msg = error?.response?.data?.message || "未知錯誤";
      alert("登入失敗: " + msg);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1",
    );
    axios.defaults.headers.common.Authorization = token;
  }, []);

  return (
    <>
      <W5Navbar />
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 font-weight-normal my-5 py-3">登入</h1>
        <div className="col-12 col-md-6 col-lg-5">
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex align-items-center mb-3">
              <label htmlFor="email" className="px-2 col-2">
                帳號
              </label>
              <input
                type="email"
                className={`form-control w-75 col-2 ${errors.email && `is-invalid`}`}
                id="email"
                placeholder="請輸入電子信箱"
                {...register("email", {
                  required: {
                    value: true,
                    message: "必填",
                  },
                })}
              />
              {errors.email && (
                <div className="invalid-feedback col-1 d-flex align-items-center ps-2">
                  {errors.email.message}
                </div>
              )}
            </div>
            <div className="d-flex mb-3">
              <label htmlFor="password" className="px-2 col-2">
                密碼
              </label>
              <input
                id="password"
                type="password"
                className={`form-control w-75 col-7 ${errors.password && `is-invalid`}`}
                placeholder="請輸入密碼"
                {...register("password", {
                  required: {
                    value: true,
                    message: "必填",
                  },
                })}
              />
              {errors.password && (
                <div className="invalid-feedback col-1 d-flex align-items-center ps-2">
                  {errors.password.message}
                </div>
              )}
            </div>
            <button className="btn btn-lg btn-primary w-50 mt-3" type="submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
