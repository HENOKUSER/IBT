import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch/useFetch";
import transformDishes from "../Api/api";
import useCartStore from "../Cart/cartStore";
import styles from "./TodaysSpecials.module.css";

const TodaysSpecials = () => {
  const addItem = useCartStore((state) => state.addItem);
  const {
    data: rawData,
    loading,
    error,
  } = useFetch("https://addis-eats-backend.onrender.com/menu/specials");
  const specials = rawData ? transformDishes(rawData) : [];

  const chefSpecials = specials
    .filter((d) => d.category !== "Beverages & Tej")
    .slice(0, 3);
  const drinks = specials.filter((d) => d.category === "Beverages & Tej");

  const [heroItem, setHeroItem] = useState(null);

  useEffect(() => {
    if (chefSpecials.length > 0 && !heroItem) {
      const random =
        chefSpecials[Math.floor(Math.random() * chefSpecials.length)];
      setHeroItem(random);
    }
  }, [chefSpecials, heroItem]);

  if (loading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>{error}</p>;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <p className={styles.tag}>Traditional Habesha Feast</p>
          <h1 className={styles.heroTitle}>
            Communal Warmth,
            <br />
            <em>Slow-Cooked Heritage.</em>
          </h1>
          <p className={styles.heroSubtitle}>
            Hand-crafted wats, ancient stone-ground teff injera, and velvety
            tefo simmered in 77-hour infused mitmita and heirloom berbere
            harvested from the Ethiopian highlands.
          </p>
          <div className={styles.heroActions}>
            <a href="#specials-grid" className={styles.btnPrimary}>
              Explore Today's Specials
            </a>
            <Link to="/menu" className={styles.btnSecondary}>
              Full Banquet Menu
            </Link>
          </div>
          <div className={styles.heroStats}>
            <span>100% Broad & Ethiopian Teff</span>
            <span>6+ Hours Slow-Cooked Stews</span>
            <span>Gursha Hospitality Shared</span>
          </div>
        </div>

        {heroItem && (
          <div className={styles.heroFeatured}>
            <img
              src={`/dishes/${heroItem.slug}.jpg`}
              alt={heroItem.nameEn}
              className={styles.heroImage}
            />
            <p className={styles.heroCaption}>
              {heroItem.nameEn} — ETB {heroItem.price}
            </p>
          </div>
        )}
      </section>

      <section id="specials-grid" className={styles.specialsSection}>
        <p className={styles.tag}>From the Clay Pots</p>
        <h2 className={styles.sectionTitle}>Today's Curated Chef Specials</h2>
        <p className={styles.sectionSubtitle}>
          Carefully balanced dishes prepared at dawn using our matriarch's 40+
          spice blend, served piping-hot on hand-struck injera.
        </p>

        <div className={styles.grid}>
          {chefSpecials.map((dish) => (
            <div key={dish.id} className={styles.card}>
              <span className={styles.cardTag}>
                {dish.fasting ? "100% Plant-Based (Tsom)" : "Chef's Special"}
              </span>
              <img
                src={`/dishes/${dish.slug}.jpg`}
                alt={dish.nameEn}
                className={styles.cardImage}
              />
              <h3 className={styles.cardTitle}>{dish.nameEn}</h3>
              <p className={styles.cardPrice}>ETB {dish.price}</p>
              <div className={styles.cardActions}>
                <Link to={`/menu/${dish.id}`} className={styles.cardLink}>
                  View Details
                </Link>
                <button
                  className={styles.cardButton}
                  onClick={() =>
                    addItem({
                      id: dish.id,
                      name: dish.nameEn,
                      price: dish.price,
                    })
                  }
                >
                  + Quick Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.gursha}>
        <blockquote className={styles.quote}>
          Those Who Share a Mesob Never Walk Alone.
        </blockquote>
        <p className={styles.gurshaText}>
          Gursha is the act of hospitality of forming a compact bite by rolling
          choice morsels of meat with warm injera and feeding them directly by
          hand. At Mesob House, every Gursha is calibrated with warmth and
          connection.
        </p>

        <div className={styles.ceremonyBox}>
          <p className={styles.ceremonyTitle}>
            Authentic Clay Ababa Bona Ceremony
          </p>
          <p className={styles.ceremonyText}>Every day at 4:00 PM...</p>
          <a href="#" className={styles.ceremonyLink}>
            Reserve Ceremony Seating
          </a>
        </div>

        <div className={styles.drinksGrid}>
          {drinks.map((drink) => (
            <div key={drink.id} className={styles.drinkCard}>
              <span className={styles.drinkTag}>
                {drink.fasting ? "House Fermented" : "Daily Infusion"}
              </span>
              <h3 className={styles.drinkTitle}>{drink.nameEn}</h3>
              <p className={styles.drinkPrice}>ETB {drink.price}</p>
              <button
                className={styles.drinkButton}
                onClick={() =>
                  addItem({
                    id: drink.id,
                    name: drink.nameEn,
                    price: drink.price,
                  })
                }
              >
                + Add Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.cta}>
        <p className={styles.tag}>Join Our Table</p>
        <h2 className={styles.ctaTitle}>
          Experience Authentic Habesha Warmth Tonight
        </h2>
        <p className={styles.ctaText}>
          Whether gathering around our clay-pot stews for a fireside dinner or
          embracing communal seating, your Mesob House table is ready when you
          are.
        </p>
        <div className={styles.ctaActions}>
          <a href="#" className={styles.btnPrimary}>
            Book a Mesob Table
          </a>
          <Link to="/menu" className={styles.btnSecondary}>
            View Complete Menu
          </Link>
        </div>
      </section>
    </div>
  );
};

export default TodaysSpecials;
