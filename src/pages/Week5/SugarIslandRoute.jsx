import { Routes, Route } from "react-router-dom";
import SugarHome from "./Week5"; //sugarIsland首頁（第五周作業）
import SugarPdList from "./SugarPdList";
import SugarCart from "./SugarCart";
import SugarPdContent from "./SugarPdContent";
import SugarNotFound from "./SugarNotFound";

export default function SugarIslandRoute() {
  return (
    <>
      <Routes>
        <Route index element={<SugarHome />} />
        <Route path="pdlist" element={<SugarPdList />} />
        <Route path="cart" element={<SugarCart />} />
        <Route path="pdlist/:id" element={<SugarPdContent />} />
        <Route path="*" element={<SugarNotFound />} />
      </Routes>
    </>
  );
}
