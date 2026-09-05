import React, { useEffect, useMemo, useRef, useState } from "react";
import Main from "./Main";
import SideBar from "./SideBar";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { loadDishes } from "./api";
import { useFetch } from "../Components/useFetch";
import { useCart } from "../Components/CartProvider";
import "../style/globale.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const searchRef = useRef(null);

  const { data, loading, error } = useFetch(
    (signal) => loadDishes(activeCategory, signal),
    [activeCategory],
  );
  const dishes = data ?? [];

  const { total, dispatch } = useCart();

  const categories = useMemo(
    () => [...new Set(dishes.map((dish) => dish.category))],
    [dishes],
  );

  const handleAdd = (dish) => dispatch({ type: "ADD", payload: dish });

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="Menu">
      <SideBar />
      <Main>
        <input
          ref={searchRef}
          type="text"
          className="dish-search"
          placeholder="Search dishes..."
        />

        {!loading && !error && (
          <CategoryBar
            categories={categories}
            activeCategory={activeCategory}
            onSelect={setActiveCategory}
          />
        )}

        <p className="order-total">Order Total: {total} ETB</p>

        {loading && <p className="loading-state">Loading menu...</p>}

        {error && (
          <p className="error-state">Couldn't load the menu: {error}</p>
        )}

        {!loading && !error && (
          <DishList
            dishes={dishes}
            activeCategory={activeCategory}
            onAdd={handleAdd}
          />
        )}
      </Main>
    </div>
  );
};

export default Menu;
