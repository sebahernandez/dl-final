import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { formatPriceCLP } from "../utils/format-price/formatPrice";

const ProductDetails = () => {
  const { name } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const formatNameFromUrl = (name) => {
      return name.replace(/-/g, " ");
    };

    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => {
        const formattedName = formatNameFromUrl(name);
        const foundProduct = data.find(
          (item) => item.name.toLowerCase() === formattedName
        );
        setProduct(foundProduct);
      })
      .catch((error) =>
        console.error("Error fetching product details:", error)
      );
  }, [name]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8 flex justify-center items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-[100px]">
        <div className="flex flex-col md:flex-row -mx-4 ">
          <div className="md:flex-1 px-4">
            <div className="h-auto rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover rounded-md"
              />
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {product.description}
            </p>
            <div className="flex mb-4 pt-5">
              <div className="mr-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Precio:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {formatPriceCLP(product.price)}
                </span>
              </div>
              <div>
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  En Stock:
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {product.stock}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <span className="font-bold text-gray-700 dark:text-gray-300 py-10">
                Selecionar numero:
              </span>
              <div className="flex items-center mt-2">
                {
                  // Array.from() creates a new array from the given argument
                  product.sizes.map((size) => (
                    <button
                      key={size}
                      className="mr-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      {size}
                    </button>
                  ))
                }
              </div>
            </div>

            <div className="flex -mx-2 mb-4 py-5">
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                  Añadir al carrito
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">
                  Añadir a favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
