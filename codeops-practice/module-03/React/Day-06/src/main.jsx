import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CartProvider from "./Cart/CartProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import DishesProvider from "./dishes/DishesProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DishesProvider>
      <CartProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CartProvider>
    </DishesProvider>
  </BrowserRouter>,
);
