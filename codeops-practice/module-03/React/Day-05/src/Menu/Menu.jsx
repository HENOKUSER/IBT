import Dish from "../Dish/Dish";
import Card from "../Card/Card";
import CategoryBar from "../CategoryBar/CategoryBar";
import { useState, useContext, useMemo } from "react";
import OrderForm from "../OrderForm/OrderForm";
import { useFetch } from "../hooks/useFetch";
import { CartContext } from "../Cart/CartProvider";

const Menu = () => {
  const [category, setCategory] = useState("All");
  const { items, dispatch, total } = useContext(CartContext);

  // const [total, setTotal] = useState(0);

  const {
    data: dishes,
    loading,
    error,
  } = useFetch("https://addis-eats-backend.onrender.com/menu/");

  console.log(dishes);

  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

  const shown = useMemo(() => {
    return dishes.filter(
      (dish) => category === "All" || dish.category === category,
    );
  }, [dishes, category]);

  const handleAdd = (dish) => dispatch({ type: "add", dish });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (shown.length === 0) return <p>No dishes in this category.</p>;
  return (
    <div>
      <p>total :{total}</p>
      <CategoryBar
        categories={categories}
        onSelect={setCategory}
        selected={category}
      />
      <OrderForm />
      {shown.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={handleAdd} />
        </Card>
      ))}
    </div>
  );
};

export default Menu;
