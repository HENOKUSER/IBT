import Dish from "../Dish/Dish";
import Card from "../Card/Card";
// import { dishes } from "../Data/data";
import CategoryBar from "../CategoryBar/CategoryBar";
import { useState } from "react";
import OrderForm from "../OrderForm/OrderForm";
import { useEffect } from "react";
import { loadDish } from "../Api/api";

const Menu = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const [category, setCategory] = useState("All");

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);
    const fetchMenu = async () => {
      try {
        const dish = await loadDish(
          "https://addis-eats-backend.onrender.com/menu/",
          controller.signal,
        );
        setData(dish);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
    return () => controller.abort();
  }, []);

  console.log(data);

  const categories = ["All", ...new Set(data.map((dish) => dish.category))];

  const filtered = data.filter(
    (dish) => category === "All" || dish.category === category,
  );

  console.log(filtered);

  // const shown =

  const carcilateTotalPrice = (price) => setTotal((prev) => price + prev);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (filtered.length === 0) return <p>No dishes in this category.</p>;
  return (
    <div>
      <p>total :{total}</p>
      <CategoryBar
        categories={categories}
        onSelect={setCategory}
        selected={category}
      />
      <OrderForm />
      {filtered.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={carcilateTotalPrice} />
        </Card>
      ))}
    </div>
  );
};

export default Menu;
