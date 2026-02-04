import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
