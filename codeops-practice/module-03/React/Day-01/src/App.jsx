import Dish from "./Dish/Dish";
import Header from "./Header/Header";
const App = () => {
  const dishes = [
    { name: "Shiro Wat", price: 120 },
    { name: "Doro Wat", price: 250 },
    { name: "Kitfo", price: 300 },
    { name: "Tibs", price: 280 },
    { name: "Firfir", price: 150 },
  ];

  return (
    <div>
      <Header />
      {dishes.map((dish) => (
        <Dish key={dish.name} name={dish.name} price={dish.price} />
      ))}
    </div>
  );
};

export default App;
