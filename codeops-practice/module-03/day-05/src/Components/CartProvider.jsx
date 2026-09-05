import React, { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";
import { cartReducer, initialCartState } from "./cartReducer";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Memoized so components that only read `count` (e.g. the header
  // badge) don't re-render on changes that don't affect them, and so
  // the context value's identity is stable across renders that don't
  // touch the cart at all.
  const value = useMemo(() => {
    const total = state.items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    const count = state.items.reduce((sum, item) => sum + item.qty, 0);

    return { items: state.items, dispatch, total, count };
  }, [state.items]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node,
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
