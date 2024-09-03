import React, { useState, useEffect } from "react";
import { ProductCard } from "../product-card/ProductCard";
import { filterProducts } from "../../utils/filters-products/FilteredProducts";

export const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = filterProducts(products);

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 py-10">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
