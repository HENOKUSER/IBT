import { useState } from "react";
import React from "react";

const Dish = ({ ...dish }) => {
  const { image, name, price, spicy, category } = dish;
  console.log(dish.image);

  const imageUrl = new URL(
    `../../../../module-02/day-23/sub/images/${image}`,
    import.meta.url,
  ).href;

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <p>{price}</p>
      {spicy && <p>spicy</p>}
    </div>
  );
};

export default Dish;
