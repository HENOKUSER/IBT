import React, { useMemo } from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import Dish from "./Dish";

const DishList = ({ dishes, activeCategory, onAdd }) => {
  const filteredDishes = useMemo(() => {
    if (!activeCategory) return dishes;
    return dishes.filter(
      (dish) => dish.category.toLowerCase() === activeCategory.toLowerCase(),
    );
  }, [dishes, activeCategory]);

  if (filteredDishes.length === 0) {
    return (
      <p className="empty-state">No dishes found for "{activeCategory}".</p>
    );
  }

  return (
    <div className="CardContainer">
      {filteredDishes.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={() => onAdd(dish)} />
        </Card>
      ))}
    </div>
  );
};

DishList.propTypes = {
  dishes: PropTypes.array.isRequired,
  activeCategory: PropTypes.string,
  onAdd: PropTypes.func.isRequired,
};

DishList.defaultProps = {
  activeCategory: null,
};

export default DishList;
