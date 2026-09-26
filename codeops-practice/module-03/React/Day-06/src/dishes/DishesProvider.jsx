import { createContext } from "react";
import { useFetch } from "../hooks/useFetch";
import { useMemo } from "react";
export const dishContext = createContext(null);
const DishesProvider = ({ children }) => {
  const {
    data: dishes,
    loading,
    error,
  } = useFetch("https://addis-eats-backend.onrender.com/menu/");

  const value = useMemo(
    () => ({ dishes, loading, error }),
    [dishes, loading, error],
  );

  return (
    <div>
      <dishContext.Provider value={value}>{children}</dishContext.Provider>
    </div>
  );
};

export default DishesProvider;
