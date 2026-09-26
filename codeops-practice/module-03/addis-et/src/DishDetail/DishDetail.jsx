import { useParams, Link } from "react-router-dom";
import { DishContext } from "../DishProvider/DishProvider";
import { useContext, useState } from "react";
import useCartStore from "../Cart/cartStore";
import styles from "./DishDetail.module.css";

const DishDetail = () => {
  const { dishes, loading, error } = useContext(DishContext);
  const { id } = useParams();
  const dish = dishes.find((item) => id === item.id);
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);

  if (loading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>{error}</p>;
  if (!dish) return <p className={styles.status}>Dish not found</p>;

  const related = dishes
    .filter((d) => d.category === dish.category && d.id !== dish.id)
    .slice(0, 3);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({ id: dish.id, name: dish.nameEn, price: dish.price });
    }
  };

  return (
    <div className={styles.page}>
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link> / <Link to="/menu">Menu</Link> /{" "}
        <Link to={`/menu?category=${dish.category}`}>{dish.category}</Link> /{" "}
        <span>{dish.nameEn}</span>
      </nav>

      <div className={styles.layout}>
        <img
          src={`/dishes/${dish.slug}.jpg`}
          alt={dish.nameEn}
          className={styles.image}
        />

        <div className={styles.info}>
          <div className={styles.badges}>
            {dish.spicy && <span className={styles.badge}>{dish.spicy}</span>}
            {dish.fasting && (
              <span className={styles.badge}>Fasting-friendly</span>
            )}
            {dish.special && (
              <span className={styles.badgeSpecial}>Chef's Special</span>
            )}
          </div>

          <h1 className={styles.title}>{dish.nameEn}</h1>
          <h4 className={styles.subtitle}>{dish.nameAm}</h4>
          <p className={styles.price}>ETB {dish.price}</p>
          <p className={styles.description}>{dish.description}</p>

          {dish.ingredients && (
            <div className={styles.ingredients}>
              <h4>Ingredients</h4>
              <ul>
                {dish.ingredients.map((ing) => (
                  <li key={ing}>{ing}</li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.orderRow}>
            <div className={styles.quantityControl}>
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
            <button className={styles.addButton} onClick={handleAdd}>
              Add to Order — ETB {dish.price * quantity}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related}>
          <h2>Pairs Wonderfully With</h2>
          <div className={styles.relatedGrid}>
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/menu/${r.id}`}
                className={styles.relatedCard}
              >
                <img src={`/dishes/${r.slug}.jpg`} alt={r.nameEn} />
                <p>{r.nameEn}</p>
                <span>ETB {r.price}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.cta}>
        <h2>The Spirit of Gursha</h2>
        <p>
          Every dish at Mesob House is prepared to be shared — gather around the
          table and taste tradition together.
        </p>
        <Link to="/menu" className={styles.ctaButton}>
          Explore Full Menu
        </Link>
      </section>
    </div>
  );
};

export default DishDetail;
