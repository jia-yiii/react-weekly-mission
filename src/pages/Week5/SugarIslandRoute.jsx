import { Routes, Route } from "react-router-dom";
import SugarHome from "./Week5"; //sugarIsland首頁（第五周作業）
import SugarLogin from "./Week6";
import SugarPdList from "./SugarPdList";
import SugarCart from "./SugarCart";
import SugarPdContent from "./SugarPdContent";
import SugarNotFound from "./SugarNotFound";
import Orders from "./Order";
import AdminProducts from "./AdminProducts";
import Footer from "../../components/Footer";

export default function SugarIslandRoute() {
  return (
    <>
      <Routes>
        <Route index element={<SugarHome />} />
        <Route path="login" element={<SugarLogin />} />
        <Route path="order" element={<Orders />} />
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
