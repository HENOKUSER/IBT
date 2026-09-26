import { createContext, useMemo } from "react";
import useFetch from "../useFetch/useFetch";
import transformDishes from "../Api/api";

// DishProvider.jsx
const DishContext = createContext();

const DishProvider = ({ children }) => {
  const {
    data: rawData,
    loading,
    error,
  } = useFetch("https://addis-eats-backend.onrender.com/menu");
  const dishes = rawData ? transformDishes(rawData) : [];

  const value = useMemo(
    () => ({ dishes, loading, error }),
    [dishes, loading, error],
  );

  return <DishContext.Provider value={value}>{children}</DishContext.Provider>;
};

export default DishProvider;
export { DishContext };
