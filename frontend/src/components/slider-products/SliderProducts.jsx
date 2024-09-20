import React, { useContext, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "@splidejs/react-splide/css";
import { formatPriceCLP } from "../../utils/format-price/formatPrice";

export const SliderProducts = () => {
  const { storeProducts: products, setProducts } = useContext(AppContext);

  // Verifica si estás en modo desarrollo o producción
  const isDevelopment = import.meta.env.MODE === "development";

  // Define la URL según el entorno
  const urlProducts = isDevelopment
    ? "http://localhost:3000/products" // URL para entorno de desarrollo
    : import.meta.env.VITE_BASE_URL + "/products"; // URL para entorno de producción

  useEffect(() => {
    if (products.length > 0) return;
    fetch(urlProducts)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="slider-products container mx-auto my-10">
      {/* Verifica si hay productos */}
      {products.length > 0 ? (
        <Splide
          options={{
            rewind: true,
            gap: "2rem",
            perPage: 4, // Mostrará 4 tarjetas en vista de escritorio
            pagination: false,
            autoplay: true,
            breakpoints: {
              640: {
                perPage: 1, // Mostrará 1 tarjeta en vista móvil (640px o menos)
                gap: "0.5rem", // Ajusta el espacio entre las tarjetas en vista móvil
              },
              1024: {
                perPage: 2, // Mostrará 2 tarjetas en vista de tablet (1024px o menos)
                gap: "1rem", // Ajusta el espacio entre las tarjetas en tablet
              },
            },
          }}
          aria-label="popular products"
        >
          {products.map((product) => (
            <SplideSlide key={product.productid}>
              <div className="border rounded-lg shadow-sm p-4 bg-white h-80">
                <Link to={`/product/${formatNameForUrl(product.name)}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <Link
                  to={`/product/${formatNameForUrl(product.name)}`}
                  className="text-md  mt-4 underline"
                >
                  {product.name}
                </Link>
                <p className="text-sm  text-gray-700 mt-4">
                  {formatPriceCLP(product.price)}
                </p>
                <p className="text-sm text-gray-600"> {product.brand}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        // Mensaje si no hay productos disponibles
        <p className="text-center text-lg text-gray-500">
          No hay productos disponibles para mostrar en el slide.
        </p>
      )}
    </div>
  );
};
