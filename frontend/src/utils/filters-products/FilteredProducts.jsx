export function FilteredProducts(products, filters) {
  const filtered = products.filter((product) => {
    const matchesCategory =
      filters.category === "all" || product.category === filters.category;
    const matchesGender =
      filters.gender === "all" || product.gender === filters.gender;
    const matchesPrice = product.price >= filters.minPrice;
    const matchesSearch =
      filters.search.length === 0 ||
      product.name.toLowerCase().includes(filters.search.toLowerCase());

    return matchesCategory && matchesGender && matchesPrice && matchesSearch;
  });

  return filtered;
}
