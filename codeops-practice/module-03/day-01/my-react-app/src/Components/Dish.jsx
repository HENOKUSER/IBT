import React from "react";

const Dish = ({ dish }) => {
  console.log(dish);
  const { image, name, price } = dish;

  const imageUrl = new URL(
    `../../../../../module-02/day-23/sub/images/${image}`,
    import.meta.url,
  ).href;

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <p>{price}</p>
      <button></button>
    </div>
  );
};

export default Dish;
