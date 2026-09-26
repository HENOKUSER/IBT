import Dish from "../Dish/Dish";
import Card from "../Card/Card";
const DishList = ({ shown, onAdd }) => {
  return (
    <div>
      {shown.map((dish) => (
        <Card key={dish.id}>
          <Dish {...dish} onAdd={onAdd} />
        </Card>
      ))}
    </div>
  );
};

export default DishList;
