import React, { useState, useEffect, useContext } from "react";
import { ProductCard } from "../product-card/ProductCard";
import { FilteredProducts } from "../../utils/filters-products/FilteredProducts";
import { Filters } from "../filters/Filters";
import { AppContext } from "../../context/AppContext";

export const ProductsList = () => {
  const { storeProducts: products, setProducts } = useContext(AppContext);
  const [priceRange, setPriceRange] = useState(0);
  const [category, setCategory] = useState("all");
  const [gender, setGender] = useState("all");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Número de productos por página

  const isDevelopment = import.meta.env.MODE === "development";

  const url = isDevelopment
    ? "http://localhost:3000/products" // URL para entorno de desarrollo
    : import.meta.env.VITE_BASE_URL + "/products"; // URL para entorno de producción

  useEffect(() => {
    if (products.length > 0) return;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filters = {
    minPrice: priceRange,
    category: category,
    gender: gender,
    search,
  };

  const filterProducts = FilteredProducts(products, filters);

  // Calcular el índice de productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filterProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filterProducts.length / productsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <section className="container mx-auto">
      <div className="py-5">
        <Filters
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          category={category}
          setCategory={setCategory}
          gender={gender}
          setGender={setGender}
          search={search}
          setSearch={setSearch}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-0 py-5">
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.productid} product={product} />
          ))
        ) : (
          <p className="text-2xl font-bold text-center w-full col-start-2 col-span-2 text-red-600 py-10">
            😔 No hay productos disponibles...
          </p>
        )}
      </div>

      {/* Controles de paginación */}
      <div className="flex justify-center items-center py-5">
        <button
          className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span className="px-4">
          Página {currentPage} de {totalPages}
        </span>
        <button
          className="mx-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </section>
  );
};
