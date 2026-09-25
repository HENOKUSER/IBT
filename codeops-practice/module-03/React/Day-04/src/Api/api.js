export async function loadDish(url, signal) {
  const res = await fetch(url, signal);
  if (!res.ok) throw new Error(`failed to load the menu ${res.status}`);
  const dish = await res.json();

  const transfromed = dish.data.map((item) => ({
    id: item.id,
    slug: item.slug,
    nameEn: item.nameEn,
    nameAm: item.nameAm,
    category: item.category,
    priceETB: item.priceETB,
    spiceLevel: item.spiceLevel,
    isFasting: item.isFasting,
    isSpecial: item.isSpecial,
    description: item.description,
    ingredients: item.ingredients,
  }));

  return transfromed;
}
