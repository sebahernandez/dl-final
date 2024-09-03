import { useState } from "react";

export const filterProducts = (products) => {
  const [filters, setFilters] = useState({
    category: "all",
    minPrice: 0,
  });

  return products.filter((product) => {
    return (
      (filters.category === "all" || product.category === filters.category) &&
      product.price >= filters.minPrice
    );
  });
};
