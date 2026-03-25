import { Routes, Route } from "react-router-dom";
import SugarIslandHome from "./SugarIslandHome";
import Login from "./Login";
import SugarPdList from "./SugarPdList";
import SugarCart from "./SugarCart";
import SugarPdContent from "./SugarPdContent";
import SugarNotFound from "./SugarNotFound";
import Order from "./Order";
import AdminProducts from "./AdminProducts";
import Footer from "../../components/Footer";

export default function Week7Route() {
  return (
    <>
      <Routes>
        <Route index element={<SugarIslandHome />} />
        <Route path="login" element={<Login />} />
        <Route path="order" element={<Order />} />
        <Route path="pdlist" element={<SugarPdList />} />
        <Route path="cart" element={<SugarCart />} />
        <Route path="admin/products" element={<AdminProducts />} />
        <Route path="pdlist/:id" element={<SugarPdContent />} />
        <Route path="*" element={<SugarNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
