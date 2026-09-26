import { useParams } from "react-router-dom";
import { dishContext } from "../dishes/DishesProvider";
import { useContext } from "react";

const DishDetail = () => {
  const { id } = useParams();
  //   const dishId = Number(id);

  const { dishes, loading, error } = useContext(dishContext);
  console.log(dishes);

  const dish = dishes.find((item) => item.id === id);

  console.log(dish);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!dish) return <p>Dish not found.</p>;
  return (
    <div>
      <h3>{dish.nameEn}</h3>
      <h5>{dish.nameAm}</h5>
      <p>{dish.category}</p>
      <p>{dish.priceETB} ETB</p>
      {dish.spiceLevel > 0 && <p>Spice level: {dish.spiceLevel}</p>}
      {dish.isFasting && <p>Fasting-friendly</p>}
      {dish.isSpecial && <p>Chef's Special</p>}
      <p>{dish.description}</p>
    </div>
  );
};

export default DishDetail;
