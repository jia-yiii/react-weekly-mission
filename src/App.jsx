import { Routes, Route } from "react-router-dom";
import { CartContext } from "./store";
import { useReducer, useEffect } from "react";
import axios from "axios";

import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Week1 from "./pages/Week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Week4 from "./pages/Week4";
import SugarIsland from "./pages/Week5/SugarIslandRoute";
import Week7 from "./pages/Week7";
import NotFound from "./pages/NotFound";

const CART_LS_KEY = "cart";
const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
  const initCart = loadLocalCart();
  const [state, dispatch] = useReducer(cartReducer, {
    cartList: initCart,
    totalPrice: totalPriceCalculate(initCart),
  });

  const actions = {
    addToCart: async (payload) => {
      const token = getTokenFromCookie();
      const isLogin = Boolean(token);

      if (!isLogin) {
        dispatch({ type: "ADD_TO_CART", payload });
        upsertLocalCart(payload);
        return;
      }

      axios.defaults.headers.common.Authorization = token;

      const current = state.cartList.find((i) => i.id === payload.id);

      if (!current) {
        await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
          data: {
            product_id: payload.id,
            qty: payload.quantity ?? 1,
          },
        });
      } else {
        if (!current.cartItemId) {
          await actions.fetchCartFromApi();
          return;
        }

        await axios.put(
          `${API_BASE}/api/${API_PATH}/cart/${current.cartItemId}`,
          {
            data: {
              product_id: current.id,
              qty: (current.quantity || 0) + (payload.quantity ?? 1),
            },
          },
        );
      }

      await actions.fetchCartFromApi();
    },

    addQty: async (payload) => {
      const token = getTokenFromCookie();
      const isLogin = Boolean(token);

      if (!isLogin) {
        dispatch({ type: "ADD_QTY", payload });
        updateLocalQty(payload.id, +1);
        return;
      }

      axios.defaults.headers.common.Authorization = token;
      const current = state.cartList.find((i) => i.id === payload.id);
      if (!current?.cartItemId) {
        await actions.fetchCartFromApi();
        return;
      }
      const nextQty = (current.quantity || 1) + 1;
      await axios.put(
        `${API_BASE}/api/${API_PATH}/cart/${current.cartItemId}`,
        {
          data: { product_id: current.id, qty: nextQty },
        },
      );
      await actions.fetchCartFromApi();
    },

    subQty: async (payload) => {
      const token = getTokenFromCookie();
      const isLogin = Boolean(token);

      if (!isLogin) {
        dispatch({ type: "SUB_QTY", payload });
        updateLocalQty(payload.id, -1);
        return;
      }

      axios.defaults.headers.common.Authorization = token;

      const current = state.cartList.find((i) => i.id === payload.id);
      if (!current?.cartItemId) {
        await actions.fetchCartFromApi();
        return;
      }

      const nextQty = Math.max(1, (current.quantity || 1) - 1);

      await axios.put(
        `${API_BASE}/api/${API_PATH}/cart/${current.cartItemId}`,
        {
          data: { product_id: current.id, qty: nextQty },
        },
      );

      await actions.fetchCartFromApi();
    },

    removeItem: async (payload) => {
      const token = getTokenFromCookie();
      const isLogin = Boolean(token);
      if (!isLogin) {
        dispatch({ type: "REMOVE_ITEM", payload });
        removeLocalItem(payload.id);
        return;
      }

      axios.defaults.headers.common.Authorization = token;
      const current = state.cartList.find((i) => i.id === payload.id);
      if (!current?.cartItemId) {
        await actions.fetchCartFromApi();
        return;
      }
      await axios.delete(
        `${API_BASE}/api/${API_PATH}/cart/${current.cartItemId}`,
      );
      await actions.fetchCartFromApi();
    },

    syncCartAfterLogin: async () => {
      const token = getTokenFromCookie();
      if (!token) return;

      axios.defaults.headers.common.Authorization = token;

      const localCart = loadLocalCart();
      if (!localCart.length) return;

      const serverRes = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      const serverCart = serverRes.data.data.carts ?? [];

      const serverMap = new Map();
      serverCart.forEach((item) => {
        serverMap.set(item.product_id, item);
      });

      for (const localItem of localCart) {
        const exist = serverMap.get(localItem.id);
        if (!exist) {
          await axios.post(`${API_BASE}/api/${API_PATH}/cart`, {
            data: {
              product_id: localItem.id,
              qty: localItem.quantity,
            },
          });
        } else {
          await axios.put(`${API_BASE}/api/${API_PATH}/cart/${exist.id}`, {
            data: {
              product_id: exist.product_id,
              qty: exist.qty + localItem.quantity,
            },
          });
        }
      }

      localStorage.removeItem(CART_LS_KEY);
      const newCartRes = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);

      dispatch({
        type: "SET_CART",
        payload: newCartRes.data.data.carts.map((item) => ({
          id: item.product_id,
          price: item.product.price,
          quantity: item.qty,
          title: item.product.title,
          imageUrl: item.product.imageUrl,
          originPrice: item.product.origin_price,
        })),
      });
    },

    setCart: (cartList) => dispatch({ type: "SET_CART", payload: cartList }),
    clearCart: () => {
      dispatch({ type: "CART_CLEAR" });
      localStorage.removeItem(CART_LS_KEY);
    },

    fetchCartFromApi: async () => {
      const token = getTokenFromCookie();
      if (!token) return;

      axios.defaults.headers.common.Authorization = token;

      const res = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
      const carts = res.data?.data?.carts ?? [];

      dispatch({
        type: "SET_CART",
        payload: carts.map((item) => ({
          id: item.product_id,
          title: item.product?.title,
          imageUrl: item.product?.imageUrl,
          originPrice: item.product?.origin_price,
          price: item.product?.price,
          quantity: item.qty,
          cartItemId: item.id,
        })),
      });
    },
  };

  useEffect(() => {
    const token = getTokenFromCookie();
    if (token) {
      actions.fetchCartFromApi();
    }
  }, []);
  return (
    <CartContext.Provider value={{ state, actions }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Week1" element={<Week1 />} />
        <Route path="/Week2" element={<Week2 />} />
        <Route path="/Week3" element={<Week3 />} />
        <Route path="/Week4" element={<Week4 />} />
        <Route path="/sugarIsland/*" element={<SugarIsland />} />
        <Route path="/Week7" element={<Week7 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const cartList = [...state.cartList];
      const index = cartList.findIndex((item) => item.id === action.payload.id);
      if (index === -1) {
        //未加入購物車
        cartList.push(action.payload);
      } else {
        //購物車有資料
        cartList[index].quantity += action.payload.quantity;
      }

      return {
        ...state,
        cartList,
        totalPrice: totalPriceCalculate(cartList),
      };
    case "ADD_QTY": {
      const newCartList = state.cartList.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );

      return {
        ...state,
        cartList: newCartList,
        totalPrice: totalPriceCalculate(newCartList),
      };
    }

    case "SUB_QTY": {
      const newCartList = state.cartList.map((item) =>
        item.id === action.payload.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );

      return {
        ...state,
        cartList: newCartList,
        totalPrice: totalPriceCalculate(newCartList),
      };
    }

    case "REMOVE_ITEM": {
      const newCartList = state.cartList.filter(
        (item) => item.id !== action.payload.id,
      );

      return {
        ...state,
        cartList: newCartList,
        totalPrice: totalPriceCalculate(newCartList),
      };
    }
    case "SET_CART": {
      const newCartList = action.payload ?? [];
      return {
        ...state,
        cartList: newCartList,
        totalPrice: totalPriceCalculate(newCartList),
      };
    }
    case "CART_CLEAR": {
      return {
        ...state,
        cartList: [],
        totalPrice: 0,
      };
    }
    default:
      return state;
  }
}

function loadLocalCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_LS_KEY)) || [];
  } catch {
    return [];
  }
}

function saveLocalCart(cartList) {
  localStorage.setItem(CART_LS_KEY, JSON.stringify(cartList));
}

function upsertLocalCart(payload) {
  const cart = loadLocalCart();
  const idx = cart.findIndex((i) => i.id === payload.id);
  if (idx === -1) cart.push(payload);
  else cart[idx].quantity += payload.quantity;
  saveLocalCart(cart);
}

function updateLocalQty(id, delta) {
  const cart = loadLocalCart();
  const next = cart.map((i) =>
    i.id === id
      ? { ...i, quantity: Math.max(1, (i.quantity || 1) + delta) }
      : i,
  );
  saveLocalCart(next);
}

function removeLocalItem(id) {
  const cart = loadLocalCart();
  saveLocalCart(cart.filter((i) => i.id !== id));
}

function totalPriceCalculate(cartList) {
  return cartList
    .map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}

function getTokenFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
}
export default App;
