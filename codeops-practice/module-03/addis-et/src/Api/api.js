function transformDishes(rawData) {
  const transformed = rawData.data.map((item) => ({
    id: item.id,
    nameEn: item.nameEn,
    nameAm: item.nameAm,
    slug: item.slug,
    category: item.category,
    price: item.priceETB,
    spicy: item.spiceLevel,
    fasting: item.isFasting,
    special: item.isSpecial,
    description: item.description,
    ingredients: item.ingredients,
  }));

  return transformed;
}

export default transformDishes;
