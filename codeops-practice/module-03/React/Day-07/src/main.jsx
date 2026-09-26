import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import DishesProvider from "./dishes/DishesProvider.jsx";
import AuthProvider from "./auth/AuthProvider.jsx";
import ThemeProvider from "./Theme/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <ThemeProvider>
    <BrowserRouter>
      <AuthProvider>
        <DishesProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </DishesProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>,
);
