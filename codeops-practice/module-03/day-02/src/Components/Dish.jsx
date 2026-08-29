import React from "react";
import PropTypes from "prop-types";

const Dish = ({ image, name, price, currency, spicy }) => {
  const imageUrl = new URL(
    `../../../../module-02/day-23/sub/images/${image}`,
    import.meta.url,
  ).href;

  return (
    <div className="card">
      <img src={imageUrl} alt={name} />
      <p className="disc">{name}</p>
      <p className="disc">
        {price} {currency}
      </p>
      {spicy && <p className="badge">Spicy</p>}
    </div>
  );
};

Dish.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string,
  spicy: PropTypes.bool,
};

Dish.defaultProps = {
  currency: "ETB",
  spicy: false,
};

export default Dish;
