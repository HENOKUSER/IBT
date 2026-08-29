import React, { useState } from "react";
import Main from "./Main";
import SideBar from "./SideBar";
import Card from "./Card";
import Dish from "./Dish";
import CategoryNav from "./CategoryNav";
import { dishes } from "./Data";
import "../style/globale.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const filteredDishes = activeCategory
    ? dishes.filter(
        (dish) => dish.category.toLowerCase() === activeCategory.toLowerCase(),
      )
    : dishes;

  return (
    <div className="Menu">
      <SideBar />
      <Main>
        <CategoryNav
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        {filteredDishes.length === 0 ? (
          <p className="empty-state">No dishes found for "{activeCategory}".</p>
        ) : (
          <div className="CardContainer">
            {filteredDishes.map((dish) => (
              <Card key={dish.id}>
                <Dish {...dish} />
              </Card>
            ))}
          </div>
        )}
      </Main>
    </div>
  );
};

export default Menu;

