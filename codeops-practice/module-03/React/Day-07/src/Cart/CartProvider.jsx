import { useMemo } from "react";
import { cartReducer } from "./cartReducer";
import { useReducer, createContext } from "react";
export const CartContext = createContext(null);
const CartProvider = ({ children }) => {
  const [items, dispatch] = useReducer(cartReducer, []);

  const total = items.reduce((tottalPrice, item) => {
    return tottalPrice + item.priceETB * item.quantity;
  }, 0);

  const value = useMemo(() => ({ items, dispatch, total }), [items, total]);
  return <CartContext.Provider value={value}> {children}</CartContext.Provider>;
};

export default CartProvider;
