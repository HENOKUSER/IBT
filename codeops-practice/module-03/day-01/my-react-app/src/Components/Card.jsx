import React from "react";
import Dish from "./Dish";
const dishes = [
  {
    id: 1,
    image: "image.png",
    name: "Doro Wat",
    category: "Main",
    price: 240,
    spicy: true,
  },
  {
    id: 2,
    image: "Shiro.jfif",
    name: "Shiro",
    category: "Vegetarian",
    price: 120,
    spicy: false,
  },
  {
    id: 3,
    image: "Kitfo.jfif",
    name: "Kitfo",
    category: "Main",
    price: 320,
    spicy: true,
  },
  {
    id: 4,
    image: "Tibs.jfif",
    name: "Tibs",
    category: "Main",
    price: 280,
    spicy: true,
  },
  {
    id: 5,
    image: "Injera Firfir.jfif",
    name: "Injera Firfir",
    category: "Breakfast",
    price: 100,
    spicy: true,
  },
  {
    id: 6,
    image: "Beyaynetu.jfif",
    name: "Beyaynetu",
    category: "Vegetarian",
    price: 150,
    spicy: false,
  },
  {
    id: 7,
    image: "Misir Wat.jfif",
    name: "Misir Wat",
    category: "Vegetarian",
    price: 110,
    spicy: true,
  },
  {
    id: 8,
    image: "Gomen.jfif",
    name: "Gomen",
    category: "Vegetarian",
    price: 90,
    spicy: false,
  },
  {
    id: 9,
    image: "image.png",
    name: "Atkilt Wot",
    category: "Vegetarian",
    price: 100,
    spicy: false,
  },
  {
    id: 10,
    image: "Derek Tibs.jfif",
    name: "Derek Tibs",
    category: "Main",
    price: 310,
    spicy: true,
  },
  {
    id: 11,
    image: "Key Wat.jfif",
    name: "Key Wat",
    category: "Main",
    price: 220,
    spicy: true,
  },
  {
    id: 12,
    image: "Alicha Wat.jfif",
    name: "Alicha Wat",
    category: "Main",
    price: 210,
    spicy: false,
  },
  {
    id: 13,
    image: "Bozena Shiro.jfif",
    name: "Bozena Shiro",
    category: "Main",
    price: 180,
    spicy: true,
  },
  {
    id: 14,
    image: "Ayibe.jfif",
    name: "Ayibe",
    category: "Side",
    price: 70,
    spicy: false,
  },
  {
    id: 15,
    image: "Kocho.jfif",
    name: "Kocho",
    category: "Side",
    price: 60,
    spicy: false,
  },
  {
    id: 16,
    image: "Enkulal Firfir.jfif",
    name: "Enkulal Firfir",
    category: "Breakfast",
    price: 110,
    spicy: true,
  },
  {
    id: 17,
    image: "Fuul.jfif",
    name: "Fuul",
    category: "Breakfast",
    price: 90,
    spicy: true,
  },
  {
    id: 18,
    image: "Genfo.jfif",
    name: "Genfo",
    category: "Breakfast",
    price: 130,
    spicy: true,
  },
  {
    id: 19,
    image: "Chechebsa.jfif",
    name: "Chechebsa",
    category: "Breakfast",
    price: 120,
    spicy: true,
  },
  {
    id: 20,
    image: "Kik Alicha.jpg",
    name: "Kik Alicha",
    category: "Vegetarian",
    price: 100,
    spicy: false,
  },
];

const Card = () => {
  console.log(dishes);
  return (
    <div className="CardContainer">
      {dishes.map((dishItem) => (
        <Dish key={dishItem.id} dish={dishItem} />
      ))}
    </div>
  );
};

export default Card;
