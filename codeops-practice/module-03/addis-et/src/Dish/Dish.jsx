import propTypes from "prop-types";
import useCartStore from "../Cart/cartStore";
import { Link } from "react-router-dom";
import { memo } from "react";
import styles from "./Dish.module.css";

const Dish = ({
  id,
  nameEn,
  nameAm,
  category,
  price,
  spicy,
  fasting,
  special,
  description,
  currency = "ETB",
  slug,
  onQuickView,
}) => {
  const addItem = useCartStore((state) => state.addItem);
  const cartItem = useCartStore((state) =>
    state.cart.find((item) => item.id === id),
  );
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handlePrice = () => {
    addItem({ id, name: nameEn, price });
  };

  return (
    <div className={styles.card}>
      <img
        src={`/dishes/${slug}.jpg`}
        alt={nameEn}
        onClick={onQuickView}
        className={styles.image}
      />
      <Link to={`/menu/${id}`} className={styles.link}>
        <div className={styles.badges}>
          {spicy && <span className={styles.badge}>{spicy}</span>}
          {fasting && <span className={styles.badge}>Fasting-friendly</span>}
          {special && (
            <span className={styles.badgeSpecial}>Chef's Special</span>
          )}
        </div>
        <h3 className={styles.title}>{nameEn}</h3>
        <h5 className={styles.subtitle}>{nameAm}</h5>
        <p className={styles.category}>{category}</p>
        <p className={styles.description}>{description}</p>
      </Link>

      <div className={styles.footer}>
        <span className={styles.price}>
          {price} {currency}
        </span>
        <button className={styles.addButton} onClick={handlePrice}>
          Add to Cart {quantityInCart > 0 && `(${quantityInCart})`}
        </button>
      </div>
    </div>
  );
};

export default memo(Dish);

Dish.propTypes = {
  nameEn: propTypes.string.isRequired,
  nameAm: propTypes.string,
  id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
  category: propTypes.string,
  price: propTypes.number.isRequired,
  spicy: propTypes.string,
  fasting: propTypes.bool,
  special: propTypes.bool,
  description: propTypes.string,
  currency: propTypes.string,
  slug: propTypes.string,
};
