import PropTypes from "prop-types";
import { useState } from "react";

const Dish = ({
  id,
  slug,
  nameEn,
  nameAm,
  category,
  priceETB,
  spiceLevel,
  isFasting,
  isSpecial,
  description,
  // ingredients,
  currency = "ETB",
  onAdd,
}) => {
  const [count, setCout] = useState(0);
  const handleAddToCart = () => {
    setCout(count + 1);
    onAdd({ id, nameEn, priceETB });
  };
  return (
    <div>
      <img
        src={`../dishes/${slug}.jpg`}
        alt={nameEn}
        loading="lazy"
        //
      />
      <p>{nameEn}</p>
      <p>{nameAm}</p>
      <p>{category}</p>
      <p>
        {priceETB} <span>{currency}</span>
      </p>
      {spiceLevel > 0 && <p>{spiceLevel}</p>}
      {isFasting && <p>{isFasting}</p>}
      <p>{isSpecial}</p>
      <p>{description}</p>
      <button onClick={handleAddToCart}>add to cart</button>
      <h5>{count}</h5>
    </div>
  );
};

export default Dish;

Dish.propTypes = {
  id: PropTypes.number.isRequired,
  nameEn: PropTypes.string.isRequired,
  nameAm: PropTypes.string,
  category: PropTypes.string.isRequired,
  priceETB: PropTypes.number.isRequired,
  spiceLevel: PropTypes.number,
  isFasting: PropTypes.bool,
  isSpecial: PropTypes.bool,
  description: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  onAdd: PropTypes.func,
};
