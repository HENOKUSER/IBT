import PropTypes from "prop-types";
import { useState } from "react";

const Dish = ({ name, price, spicy, currency = "ETB", onAdd }) => {
  const [count, setCout] = useState(0);
  const handLeadToCart = () => {
    setCout(count + 1);
    onAdd(price);
  };
  return (
    <div>
      <p>{name}</p>
      <p>
        {price} <span>{currency}</span>
      </p>
      {spicy && <p>spicy</p>}
      <button onClick={handLeadToCart}>add to cart</button>
      <h5>{count}</h5>
    </div>
  );
};

export default Dish;

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
};
