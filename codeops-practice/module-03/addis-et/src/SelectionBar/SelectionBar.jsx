import { Link } from "react-router-dom";
import useCartStore from "../Cart/cartStore";
import styles from "./SelectionBar.module.css";

const SelectionBar = () => {
  const cart = useCartStore((state) => state.cart);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (itemCount === 0) return null;

  return (
    <div className={styles.bar}>
      <span>
        Selected: {itemCount} items, ETB {total}
      </span>
      <Link to="/cart" className={styles.button}>
        Proceed to Cart
      </Link>
    </div>
  );
};

export default SelectionBar;
