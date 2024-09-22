import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { formatPriceCLP } from "../utils/format-price/formatPrice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductDetails = () => {
  const { name } = useParams();
  const { favorites, addToCart, addToFavorites, removeFromFavorites } =
    useContext(AppContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const isFavorite = favorites.some(
    (fav) => fav.id === product?.id && fav.size === selectedSize
  );

  // Verifica si estás en modo desarrollo o producción
  const isDevelopment = import.meta.env.MODE === "development";

  // Define la URL de productos según el entorno
  const urlProducts = isDevelopment
    ? "http://localhost:3000/products" // URL para entorno de desarrollo
    : import.meta.env.VITE_BASE_URL + "/products"; // URL para entorno de producción

  useEffect(() => {
    const formatNameFromUrl = (name) => {
      return name.replace(/-/g, " ");
    };

    fetch(urlProducts)
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

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }

    // Añadir el producto al carrito con la talla seleccionada
    addToCart({ ...product, size: selectedSize });

    // Mostrar notificación usando React Toastify
    toast.success(`${product.name} añadido al carrito!`, {
      position: "bottom-right",
    });
  };

  const handleFavorites = () => {
    if (!selectedSize) {
      alert("Por favor selecciona una talla");
      return;
    }

    if (isFavorite) {
      removeFromFavorites(product.id, selectedSize);

      toast.success(`${product.name} eliminado de favoritos!`, {
        position: "bottom-right",
      });
    } else {
      addToFavorites({ ...product, size: selectedSize });

      toast.success(`${product.name} añadido a favoritos!`, {
        position: "bottom-right",
      });
    }
  };

  if (!product) {
    return (
      <div className="py-10 flex justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="py-3 flex justify-center items-center ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-[30px]">
        <div className="flex flex-col md:flex-row -mx-4 bg-white justify-center items-center rounded-md">
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
                Seleccionar número:
              </span>
              <div className="flex items-center mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`mr-2 py-2 px-4 rounded-full font-bold ${
                      selectedSize === size
                        ? "bg-gray-900 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
                    } hover:bg-gray-300 dark:hover:bg-gray-600`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex -mx-2 mb-4 py-5">
              <div className="w-1/2 px-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Añadir al carrito
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button
                  onClick={handleFavorites}
                  className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                >
                  {isFavorite ? (
                    <FaHeart className="mr-2 text-red-500" />
                  ) : (
                    <FaRegHeart className="mr-2 text-gray-500" />
                  )}
                  {isFavorite ? "Favorito" : "Añadir a favoritos"}
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
