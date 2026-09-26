import { useState } from "react";
import Dish from "../Dish/Dish";
import Card from "../Card/Card";
import Modal from "../ui/Modal";
import styles from "./DishList.module.css";

const DishList = ({ shown, category }) => {
  const [activeDish, setActiveDish] = useState(null);

  return (
    <div>
      {shown.length === 0 ? (
        <p className={styles.empty}>{category} is not found in the menu</p>
      ) : (
        <div className={styles.grid}>
          {shown.map((dish) => (
            <Card key={dish.id}>
              <Dish
                id={dish.id}
                nameEn={dish.nameEn}
                nameAm={dish.nameAm}
                slug={dish.slug}
                category={dish.category}
                price={dish.price}
                spicy={dish.spicy}
                fasting={dish.fasting}
                special={dish.special}
                description={dish.description}
                onQuickView={() => setActiveDish(dish)}
              />
            </Card>
          ))}
        </div>
      )}

      {activeDish && (
        <Modal onClose={() => setActiveDish(null)}>
          <h3>{activeDish.nameEn}</h3>
          <h5>{activeDish.nameAm}</h5>
          <p>{activeDish.category}</p>
          <p>{activeDish.price} ETB</p>
          {activeDish.spicy && <p>{activeDish.spicy}</p>}
          {activeDish.fasting && <p>Fasting-friendly</p>}
          {activeDish.special && <p>Chef's Special</p>}
          <p>{activeDish.description}</p>
        </Modal>
      )}
    </div>
  );
};

export default DishList;
