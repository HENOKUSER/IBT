// Wraps fetch with a res.ok check so callers only ever deal with
// either resolved data or a thrown Error with a clear message.
export async function loadDishes(category, signal) {
  const url = category
    ? `/dishes.json?category=${encodeURIComponent(category)}`
    : "/dishes.json";

  const res = await fetch(url, { signal });

  if (!res.ok) {
    throw new Error(`Failed to load menu (status ${res.status})`);
  }

  return res.json();
}
