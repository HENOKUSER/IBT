import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import CartProvider from "./Cart/CartProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./auth/AuthProvider.jsx";
import DishProvider from "./DishProvider/DishProvider.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <DishProvider>
      <AuthProvider>
        <CartProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </CartProvider>
      </AuthProvider>
    </DishProvider>
  </BrowserRouter>,
);
