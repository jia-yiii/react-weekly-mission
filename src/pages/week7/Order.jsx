import { useContext, useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../../store";
import axios from "axios";
import Navbar from "../../components/W6Navbar";
import CartTable from "../../components/CartTable";
import style from "./order.module.css";
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function Order() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { state, actions } = useContext(CartContext);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_BASE}/api/${API_PATH}/order`, {
        data: {
          user: {
            name: data.name,
            email: data.email,
            tel: data.tel,
            address: data.address,
          },
          message: data.message,
        },
      });

      alert("訂單已完成✅ 訂單編號：" + res.data.orderId);
      actions.clearCart();
      navigate("/week7");
    } catch (err) {
      console.error(err);
      console.log("status:", err.response?.status);
      console.log("data:", err.response?.data);
      console.log("url:", err.config?.url);
    }
  };

  return (
    <>
      <Navbar basePath="/week7" />
      <div className={`d-flex align-items-center ${style.header}`}>
        <div className={`flex-fill ${style.headerBanner}`}>
          <br />
          <p className={`text-center h2 ${style.headerText}`}>訂單確認</p>
          <br />
        </div>
      </div>
      <div className="container">
        <div className="mt-4 ms-4 d-flex justify-content-start">
          <NavLink
            to="/week7/cart"
            className={`btn ${style.btn} rounded px-3 `}
          >
            回到購物車
          </NavLink>
        </div>
        <hr />
        <div className="container">
          <div className="row row-cols-lg-2 align-items-stretch">
            <div>
              <CartTable
                cartList={state.cartList}
                totalPrice={state.totalPrice}
                ui={{ editableQty: false, removable: false }}
              />
            </div>
            <div className="row justify-content-center">
              <form
                className="px-2"
                id="form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-3 row">
                  <label
                    htmlFor="email"
                    className="form-label col-lg-3 col-4 col-form-label fw-bold"
                  >
                    Email
                  </label>
                  <div className="col-lg-9 col-8">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`form-control ${errors.email && `is-invalid`}`}
                      placeholder="請輸入 Email"
                      {...register("email", {
                        required: {
                          value: true,
                          message: "必填",
                        },
                        pattern: {
                          value: /^\S+@\S+\.\S+$/,
                          message: "Email 格式不正確 ex: name@gmail.com",
                        },
                      })}
                    />
                    {errors.email && (
                      <div className="invalid-feedback col-1 d-flex align-items-center ps-2">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="name"
                    className="form-label col-lg-3 col-4 col-form-label fw-bold"
                  >
                    收件人姓名
                  </label>
                  <div className="col-lg-9 col-8">
                    <input
                      id="name"
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="請輸入姓名"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "必填",
                        },
                      })}
                    />
                    {errors.name && (
                      <div className="invalid-feedback col-1 d-flex align-items-center ps-2">
                        {errors.name.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="tel"
                    className="form-label col-lg-3 col-4 col-form-label fw-bold"
                  >
                    收件人電話
                  </label>
                  <div className="col-lg-9 col-8">
                    <input
                      id="tel"
                      type="tel"
                      className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                      placeholder="請輸入電話"
                      {...register("tel", {
                        required: {
                          value: true,
                          message: "必填",
                        },
                        pattern: {
                          value: /^09\d{8}$/, // 台灣手機格式：09開頭後接8位數字
                          message: "請輸入正確的手機格式 (如: 0912345678)",
                        },
                      })}
                    />
                    {errors.tel && (
                      <div className="invalid-feedback col-1 d-flex align-items-center ps-2">
                        {errors.tel.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="address"
                    className="form-label col-lg-3 col-4 col-form-label fw-bold"
                  >
                    收件人地址
                  </label>
                  <div className="col-lg-9 col-8">
                    <input
                      id="address"
                      name="地址"
                      type="text"
                      className={`form-control ${errors.address ? "is-invalid" : ""}`}
                      placeholder="請輸入地址"
                      {...register("address", {
                        required: {
                          value: true,
                          message: "必填",
                        },
                      })}
                    />
                    {errors.address && (
                      <div className="invalid-feedback col-1 d-flex align-items-center ps-2">
                        {errors.address.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-3 row">
                  <label
                    htmlFor="message"
                    className="form-label col-lg-3 col-4 col-form-label fw-bold"
                  >
                    留言
                  </label>
                  <div className="col-lg-9 col-8">
                    <textarea
                      id="message"
                      className="form-control"
                      placeholder="訂單注意事項（選填）"
                      cols="30"
                      rows="4"
                      {...register("message")}
                    ></textarea>
                  </div>
                </div>
                <div className="text-end">
                  <button type="submit" className={`btn ${style.btn2}`}>
                    送出訂單
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
