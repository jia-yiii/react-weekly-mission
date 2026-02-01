import { Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <>
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
      </Routes>
    </>
  );
}

export default App;
