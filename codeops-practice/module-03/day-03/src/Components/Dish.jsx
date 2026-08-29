import React, { useState } from "react";
import PropTypes from "prop-types";

const Dish = ({ image, name, price, currency, spicy, onAdd }) => {
  const [count, setCount] = useState(0);

  const imageUrl = new URL(
    `../../../../module-02/day-23/sub/images/${image}`,
    import.meta.url,
  ).href;

  const handleAdd = () => {
    setCount(count + 1);
    onAdd(price);
  };

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
      <p>
        {price} {currency}
      </p>
      {typeof spicy === "boolean" && spicy && <p className="badge">Spicy</p>}
      <div className="dish-controls">
        <button className="btn" onClick={handleAdd}>
          Add
        </button>
        <span className="count" > {count}</span>
      </div>
    </div>
  );
};

Dish.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
  onAdd: PropTypes.func.isRequired,
};

Dish.defaultProps = {
  currency: "ETB",
  spicy: false,
};

export default Dish;
