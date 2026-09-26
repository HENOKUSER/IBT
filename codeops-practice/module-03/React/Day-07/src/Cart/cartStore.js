import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist((set) => ({
    items: [],

    addItem: (dish) =>
      set((state) => {
        const exists = state.items.some((item) => item.id === dish.id);

        if (exists) {
          return {
            items: state.items.map((item) =>
              item.id === dish.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          };
        }

        return { items: [...state.items, { ...dish, quantity: 1 }] };
      }),

    remove: (id) =>
      set((state) => {
        const exists = state.items.some((item) => item.id === id);
        if (!exists) return state;

        const decremented = state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        );

        return { items: decremented.filter((item) => item.quantity > 0) };
      }),

    clear: () => set({ items: [] }),
  })),
);
