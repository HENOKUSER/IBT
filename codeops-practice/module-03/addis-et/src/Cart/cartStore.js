import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addItem: (items) =>
        set((state) => {
          const exists = state.cart.some((i) => i.id === items.id);

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === items.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            };
          }

          return { cart: [...state.cart, { ...items, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => {
          const used = state.cart.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
          );
          return { cart: used.filter((i) => i.quantity > 0) };
        }),

      clear: () => set({ cart: [] }),
    }),
    { name: "addis-eats-cart" },
  ),
);

export default useCartStore;
