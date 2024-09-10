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
    <div className="slider-products container mx-auto py-10">
      <Splide
        options={{
          rewind: true,
          gap: "1rem",
          perPage: 4,
          pagination: false,
          autoplay: true,
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
