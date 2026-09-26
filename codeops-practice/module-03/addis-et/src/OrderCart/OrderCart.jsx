import { Link } from "react-router-dom";
import useCartStore from "../Cart/cartStore";
import styles from "./OrderCart.module.css";

const OrderCart = () => {
  const cart = useCartStore((state) => state.cart);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <p>Your basket is empty.</p>
        <Link to="/menu" className={styles.browseButton}>
          Browse the Menu
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Your Gursha Basket</h1>

      <div className={styles.list}>
        {cart.map((item) => (
          <div key={item.id} className={styles.row}>
            <span className={styles.name}>{item.name}</span>
            <span className={styles.price}>ETB {item.price}</span>

            <div className={styles.quantityControl}>
              <button onClick={() => removeItem(item.id)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => addItem(item)}>+</button>
            </div>

            <span className={styles.lineTotal}>
              ETB {item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className={styles.summary}>
        <span>Subtotal</span>
        <span className={styles.subtotalAmount}>ETB {subtotal}</span>
      </div>

      <Link to="/checkout" className={styles.checkoutButton}>
        Proceed to Delivery Checkout
      </Link>
    </div>
  );
};

export default OrderCart;
