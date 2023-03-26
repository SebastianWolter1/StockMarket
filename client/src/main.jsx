import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import StockContextProvider from "./global/Context";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StockContextProvider>
      <App />
    </StockContextProvider>
  </BrowserRouter>
);
