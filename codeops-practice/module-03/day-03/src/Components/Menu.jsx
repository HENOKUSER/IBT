import React, { useState } from "react";
import Main from "./Main";
import SideBar from "./SideBar";
import CategoryBar from "./CategoryBar";
import DishList from "./DishList";
import DeliveryForm from "./DeliveryForm";
import { dishes } from "./Data";
import "../style/globale.css";

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [orderTotal, setOrderTotal] = useState(0);

  const categories = [...new Set(dishes.map((dish) => dish.category))];

  const handleAdd = (price) => {
    setOrderTotal(orderTotal + price);
  };

  return (
    <div className="Menu">
      <SideBar />
      <Main>
        <CategoryBar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={setActiveCategory}
        />
        <p className="order-total">Order Total: {orderTotal} ETB</p>
        <DishList activeCategory={activeCategory} onAdd={handleAdd} />
        {/* <DeliveryForm /> */}
      </Main>
    </div>
  );
};

export default Menu;
