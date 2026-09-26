import { Link } from "react-router-dom";
import useAuth from "../auth/useAuth";
import useCartStore from "../Cart/cartStore";
import styles from "./Header.module.css";

const Header = () => {
  const { currentUser, isSignedIn, logout } = useAuth();
  const cart = useCartStore((state) => state.cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Addis Eats
      </Link>

      <nav className={styles.nav}>
        <Link to="/menu" className={styles.navLink}>
          Menu
        </Link>
        <Link to="/cart" className={styles.navLink}>
          Order & Cart
        </Link>
        <Link to="/checkout" className={styles.navLink}>
          Delivery & Checkout
        </Link>
      </nav>

      <div className={styles.rightSection}>
        <div className={styles.cart}>
          <span>{itemCount} items</span>
          <span>ETB {total}</span>
        </div>

        {isSignedIn ? (
          <div className={styles.account}>
            <span className={styles.greeting}>Welcome, {currentUser.name}</span>
            <button className={styles.signInButton} onClick={logout}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className={styles.account}>
            <Link to="/signin" className={styles.navLink}>
              Sign In
            </Link>
            <Link to="/register" className={styles.signInButton}>
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
