import PropTypes from "prop-types";

const Dish = ({ name, price, spicy, currency = "ETB" }) => {
  return (
    <div>
      <p>{name}</p>
      <p>
        {price} <span>{currency}</span>
      </p>
      {spicy && <p>spicy</p>}
    </div>
  );
};

export default Dish;

Dish.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  spicy: PropTypes.bool,
};
