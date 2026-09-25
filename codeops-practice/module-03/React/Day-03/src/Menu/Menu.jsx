import Dish from "../Dish/Dish";
import Card from "../Card/Card";
import { dishes } from "../Data/data";
import CategoryBar from "../CategoryBar/CategoryBar";
import { useState } from "react";
import OrderForm from "../OrderForm/OrderForm";

const Menu = () => {
  const cat = dishes.map((i) => i.category);
  cat.unshift("All");
  const [category, setCategory] = useState("All");

  const filtered = dishes.filter(
    (dish) => category === "All" || dish.category === category,
  );

  if (filtered.length === 0) {
    return <p>No dishes in this category.</p>;
  }

  const [total, setTotal] = useState(0);

  const carcilateTotalPrice = (price) => setTotal((prev) => price + prev);

  return (
    <div>
      <p>total :{total}</p>
      <CategoryBar
        category={cat}
        setCategory={setCategory}
        selected={category}
      />
      <OrderForm />
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish
            name={dish.name}
            price={dish.price}
            spicy={dish.spicy}
            onAdd={carcilateTotalPrice}
          />
        </Card>
      ))}
    </div>
  );
};

export default Menu;
