import CategoryBar from "../CategoryBar/CategoryBar";
import { useContext, useMemo } from "react";
import OrderForm from "../OrderForm/OrderForm";
import { dishContext } from "../dishes/DishesProvider";
import DishList from "../DishList/DishList";
import { useSearchParams } from "react-router-dom";
import { useCartStore } from "../Cart/cartStore";

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";

  // const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  // const total = items.reduce(
  //   (sum, item) => sum + item.priceETB * item.quantity,
  //   0,
  // );

  const { dishes, loading, error } = useContext(dishContext);

  const categories = ["All", ...new Set(dishes.map((dish) => dish.category))];

  const shown = useMemo(() => {
    return dishes.filter(
      (dish) => category === "All" || dish.category === category,
    );
  }, [dishes, category]);

  const handleAdd = (dish) => addItem(dish);

  const handleSelectCategory = (cat) => setSearchParams({ category: cat });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (shown.length === 0) return <p>No dishes in this category.</p>;
  return (
    <div>
      {/* <p>total :{total}</p> */}
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
