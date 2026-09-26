export function cartReducer(state, action) {
  switch (action.type) {
    case "add": {
      const exist = state.some((item) => item.id === action.dish.id);
      if (exist) {
        return state.map((item) =>
          item.id === action.dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...state, { ...action.dish, quantity: 1 }];
    }
    case "remove": {
      const exists = state.some((item) => item.id === action.id);
      if (!exists) return state;

      const decremented = state.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item,
      );
      return decremented.filter((item) => item.quantity > 0);
    }
    case "clear":
      return [];
    default:
      return state;
  }
}


