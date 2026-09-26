import { createContext, useReducer, useMemo } from "react";
import cartReducer from "./cartReducer";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const value = useMemo(() => ({ cart, dispatch, total }), [cart, total]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
export { CartContext };
