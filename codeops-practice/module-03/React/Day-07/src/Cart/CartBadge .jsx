import { useCartStore } from "./cartStore";

const CartBadge = () => {
  const items = useCartStore((state) => state.items);

  const cartItem = items.reduce((totalItem, item) => {
    return totalItem + item.quantity;
  }, 0);

  // const totlPrice = items.reduce(
  //   (total, item) => total + item.priceETB * item.quantity,
  //   0,
  // );

  const total = items.reduce((sum, item) => {
    return sum + item.priceETB * item.quantity;
  }, 0);

  return (
    cartItem > 0 && (
      <span>
        🛒 {cartItem} {total}
      </span>
    )
  );
};

export default CartBadge;
