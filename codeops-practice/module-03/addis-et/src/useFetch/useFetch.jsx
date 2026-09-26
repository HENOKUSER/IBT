import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    const load = async () => {
      try {
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`error fetching ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(`fail to load ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};
export default useFetch;
