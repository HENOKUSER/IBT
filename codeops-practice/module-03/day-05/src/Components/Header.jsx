import React from "react";
import { useCart } from "../Components/CartProvider";
import "../style/globale.css";

const Header = () => {
  const { count } = useCart();

  return (
    <div className="header">
      <h1>header</h1>
      <span className="cart-badge">{count} item{count === 1 ? "" : "s"}</span>
    </div>
  );
};

export default Header;
