import { useContext } from "react";
import { Link } from "react-router-dom";
import { DishContext } from "../DishProvider/DishProvider";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const { dishes, loading } = useContext(DishContext);

  const recommended = !loading ? dishes.slice(0, 3) : [];

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.emoji}>🍲</p>
        <p className={styles.errorLabel}>TABLE NOT SET — ERROR</p>
        <h1 className={styles.code}>404</h1>
        <p className={styles.message}>
          Looks like this dish has already been enjoyed or never made it to the
          kitchen!
        </p>
        <p className={styles.subtext}>
          Even the best Gursha sometimes slips! Don't let your appetite wait —
          our Addis kitchen has hot clay pot wats and freshly rolled teff injera
          ready for your table right now.
        </p>

        <div className={styles.actions}>
          <Link to="/" className={styles.primaryButton}>
            Return to Today's Specials
          </Link>
          <Link to="/menu" className={styles.secondaryButton}>
            Explore Full Menu
          </Link>
          <Link to="/cart" className={styles.secondaryButton}>
            Check Current Order
          </Link>
        </div>
      </div>

      {recommended.length > 0 && (
        <section className={styles.recommended}>
          <h2>Hungry? Here's What Our Guests Love Today</h2>
          <div className={styles.grid}>
            {recommended.map((dish) => (
              <Link
                key={dish.id}
                to={`/menu/${dish.id}`}
                className={styles.card}
              >
                <img src={`/dishes/${dish.slug}.jpg`} alt={dish.nameEn} />
                <p className={styles.cardTitle}>{dish.nameEn}</p>
                <span className={styles.cardPrice}>ETB {dish.price}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default NotFound;
