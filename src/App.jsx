import { Routes, Route } from "react-router-dom";
import { CartContext } from "./store";
import { useReducer } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import Week1 from "./pages/Week1";
import Week2 from "./pages/Week2";
import Week3 from "./pages/Week3";
import Week4 from "./pages/Week4";
import SugarIsland from "./pages/Week5/SugarIslandRoute";
import Week6 from "./pages/Week6";
import Week7 from "./pages/Week7";
import Week8 from "./pages/Week8";
import NotFound from "./pages/NotFound";

function App() {
  const cartReducer = useReducer(
    (state, action) => {
      const cartList = [...state.cartList];
      const index = cartList.findIndex((item) => item.id === action.payload.id);
      switch (action.type) {
        case "ADD_TO_CART":
          const newCartList = [...state.cartList];
          const index = newCartList.findIndex(
            (item) => item.id === action.payload.id,
          );
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
        default:
          return state;
      }
    },
    {
      cartList: [],
    },
  );
  return (
    <CartContext.Provider value={cartReducer}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Week1" element={<Week1 />} />
        <Route path="/Week2" element={<Week2 />} />
        <Route path="/Week3" element={<Week3 />} />
        <Route path="/Week4" element={<Week4 />} />
        <Route path="/sugarIsland/*" element={<SugarIsland />} />
        <Route path="/Week6" element={<Week6 />} />
        <Route path="/Week7" element={<Week7 />} />
        <Route path="/Week8" element={<Week8 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CartContext.Provider>
  );
}

function totalPriceCalculate(cartList) {
  return cartList
    .map((item) => item.quantity * item.price)
    .reduce((a, b) => a + b, 0);
}
export default App;
