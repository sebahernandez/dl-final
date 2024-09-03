export function FilteredProducts(products, filters) {
  const filtered = products.filter((product) => {
    return (
      (filters.category === "all" || product.category === filters.category) &&
      product.price >= filters.minPrice
    );
  });

  console.log("Productos filtrados:", filtered); // Verifica los productos después de aplicar los filtros
  return filtered;
}
