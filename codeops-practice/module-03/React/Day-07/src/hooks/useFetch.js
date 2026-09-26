import { useState, useEffect } from "react";
import { loadDish } from "../Api//api";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const Controller = new AbortController();

    const featchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const dishList = await loadDish(url, Controller.signal);
        setData(dishList);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    featchData();
    return () => Controller.abort();
  }, [url]);

  return { data, loading, error };
}
