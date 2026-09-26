import CategoryBar from "../CategoryBar/CategoryBar";
import { useState, useContext, useMemo } from "react";
import OrderForm from "../OrderForm/OrderForm";
import { CartContext } from "../Cart/CartProvider";
import { dishContext } from "../dishes/DishesProvider";
import DishList from "../DishList/DishList";
import { useSearchParams } from "react-router-dom";

const Menu = () => {
  // const [category, setCategory] = useState("All");
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  const { dispatch, total } = useContext(CartContext);
  const { dishes, loading, error } = useContext(dishContext);

  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

  const shown = useMemo(() => {
    return dishes.filter(
      (dish) => category === "All" || dish.category === category,
    );
  }, [dishes, category]);

  const handleAdd = (dish) => dispatch({ type: "add", dish });

  const handleSelectCategory = (cat) => setSearchParams({ category: cat });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (shown.length === 0) return <p>No dishes in this category.</p>;
  return (
    <div>
      <p>total :{total}</p>
      <CategoryBar
        categories={categories}
        onSelect={handleSelectCategory}
        selected={category}
      />
      <OrderForm />
      <DishList shown={shown} onAdd={handleAdd} />
    </div>
  );
};

export default Menu;
