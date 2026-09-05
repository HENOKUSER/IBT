import { useEffect, useState } from "react";

/**
 * Generic fetch hook: data, loading, error and cleanup.
 *
 * `fetcher` is a function that takes an AbortSignal and returns a
 * promise — this keeps the hook agnostic to *what* it's fetching
 * (dishes today, something else tomorrow) while still owning the
 * abort/cleanup wiring itself.
 *
 * `deps` re-runs the fetch whenever any value in it changes, and
 * cancels whatever request was still in flight first.
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        if (cancelled) return;
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled || err.name === "AbortError") return;
        setError(err.message);
        setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
