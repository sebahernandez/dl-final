import React, { useContext, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import "@splidejs/react-splide/css";
import { formatPriceCLP } from "../../utils/format-price/formatPrice";

export const SliderProducts = () => {
  const { storeProducts: products, setProducts } = useContext(AppContext);
  console.log(products);

  useEffect(() => {
    if (products.length > 0) return;

    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="slider-products container mx-auto my-10">
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
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
          <SplideSlide key={product.id}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <img
                className="w-full h-48 object-cover"
                src={product.image}
                alt={product.name}
              />
              <div className="px-6 py-4">
                <Link
                  to={`/product/${formatNameForUrl(product.name)}`}
                  className="text-xl font-bold mt-4 underline"
                >
                  {product.name}
                </Link>
                <p className="text-gray-700 text-base">{product.description}</p>
                <p className="text-lg font-semibold text-black py-2">
                  {formatPriceCLP(product.price)}
                </p>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  );
};
