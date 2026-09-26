function cartReducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const exists = state.some((item) => item.id === action.item.id);
      if (exists)
        return state.map((item) =>
          item.id === action.item.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );

      return [...state, { ...action.item, quantity: 1 }];
    }

    case "REMOVE": {
      const updated = state.map((item) =>
        item.id === action.item.id
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      return updated.filter((item) => item.quantity > 0);
    }

    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export default cartReducer;
