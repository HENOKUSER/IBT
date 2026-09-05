import React, { useEffect, useRef, useState } from "react";
import Main from "./Main";
import SideBar from "./SideBar";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import { loadDishes } from "./api";
import "../style/globale.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);

  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const searchRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError(null);

    loadDishes(activeCategory, controller.signal)
      .then((data) => {
        setDishes(data);
        setLoading(false);
      })
      .catch((err) => {
        // A cancelled request throws AbortError when we swap category
        // mid-flight — that's expected, not a real failure.
        if (err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    // Cancel the in-flight request if the category changes again
    // (or the component unmounts) before it resolves.
    return () => controller.abort();
  }, [activeCategory]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  const categories = [...new Set(dishes.map((dish) => dish.category))];

  const handleAdd = (price) => {
    setOrderTotal(orderTotal + price);
  };

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

        <p className="order-total">Order Total: {orderTotal} ETB</p>

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
