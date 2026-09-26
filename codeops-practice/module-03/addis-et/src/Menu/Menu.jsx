import { useContext, useEffect, useRef, useState } from "react";
import CategoryBar from "../CategoryBar/CategoryBar";
import DishList from "../DishList/DishList";
import { useSearchParams } from "react-router-dom";
import { DishContext } from "../DishProvider/DishProvider";
import useCartStore from "../Cart/cartStore";
import SelectionBar from "../SelectionBar/SelectionBar";
import styles from "./Menu.module.css";

const Menu = () => {
  const [search, setSearch] = useState("");
  const { dishes, loading, error } = useContext(DishContext);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!loading && searchRef.current) {
      searchRef.current.focus();
    }
  }, [loading]);

  const categories = [...new Set(dishes.map((d) => d.category))];
  categories.unshift("All");

  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || categories[0];

  const shown = dishes.filter((dish) => {
    const matchesCategory =
      category === "All" || dish.category.includes(category);
    const matchesSearch = dish.nameEn
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <p className={styles.status}>Loading...</p>;
  if (error) return <p className={styles.status}>{error}</p>;

  return (
    <div className={styles.page}>
      <div className={styles.controls}>
        <input
          ref={searchRef}
          type="text"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <CategoryBar
          categories={categories}
          selected={category}
          onSelect={(cat) => setSearchParams({ category: cat })}
        />
      </div>

      <DishList shown={shown} category={category} />

      <section className={styles.cta}>
        <h2 className={styles.ctaTitle}>
          Experience Communal Dining Around the Mesob
        </h2>
        <p className={styles.ctaText}>
          Every platter is prepared to be shared — gather your table and taste
          Ethiopian hospitality the traditional way.
        </p>
        <a href="#" className={styles.ctaButton}>
          Reserve a Group Mesob Table
        </a>
      </section>

      <SelectionBar />
    </div>
  );
};

export default Menu;
