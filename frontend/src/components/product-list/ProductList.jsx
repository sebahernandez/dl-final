import React, { useState, useEffect } from "react";
import { ProductCard } from "../product-card/ProductCard";
import { FilteredProducts } from "../../utils/filters-products/FilteredProducts";
import { Filters } from "../filters/Filters";

export const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [priceRange, setPriceRange] = useState(0);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filters = {
    minPrice: priceRange,
    category: category,
  };

  const filterProducts = FilteredProducts(products, filters);

  return (
    <section className="container mx-auto">
      <div className="py-5">
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-0 py-5">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-2xl font-bold text-center w-full col-start-2 col-span-2 text-red-600 py-10">
            😔 No hay productos disponibles en el precio que buscas...
          </p>
        )}
      </div>
    </section>
  );
};
