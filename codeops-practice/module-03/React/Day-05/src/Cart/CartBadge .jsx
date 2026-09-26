import { useContext } from "react";
import { CartContext } from "./CartProvider";
const CartBadge = () => {
  const { items } = useContext(CartContext);
  const cartItem = items.reduce((totalItem, item) => {
    return totalItem + item.quantity;
  }, 0);
  return <span>🛒 {cartItem}</span>;
};

export default CartBadge;
