import Dish from "../Dish/Dish";
import Card from "../Card/Card";
import { dishes } from "../Data/data";

const Menu = () => {
  const category = "All";
  const filtered = dishes.filter(
    (dish) => category === "All" || dish.category === category,
  );

  if (filtered.length === 0) {
    return <p>No dishes in this category.</p>;
  }

  return (
    <div>
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish name={dish.name} price={dish.price} spicy={dish.spicy} />
        </Card>
      ))}
    </div>
  );
};

export default Menu;
