export function FilteredProducts(products, filters) {
  const filtered = products.filter((product) => {
    return (
      (filters.category === "all" || product.category === filters.category) &&
      (filters.gender === "all" || product.gender === filters.gender) &&
      product.price >= filters.minPrice
    );
  });
  // Verifica los productos después de aplicar los filtros
  return filtered;
}
