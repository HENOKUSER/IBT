export const initialCartState = { items: [] };

export function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const dish = action.payload;
      const existing = state.items.find((item) => item.id === dish.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === dish.id ? { ...item, qty: item.qty + 1 } : item,
          ),
        };
      }

      return { items: [...state.items, { ...dish, qty: 1 }] };
    }

    case "REMOVE":
      return {
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "CLEAR":
      return { items: [] };

    default:
      return state;
  }
}
