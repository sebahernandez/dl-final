import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { formatPriceCLP } from "../utils/format-price/formatPrice";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  const handleRemoveFromFavorites = (id, size) => {
    removeFromFavorites(id, size);
  };

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="container mx-auto py-[100px]">
      <h1 className="text-4xl font-bold text-center mb-8">
        Tus productos favoritos
      </h1>
      <p className="text-lg text-center mb-12 text-gray-600">
        Aquí puedes ver los productos que has marcado como favoritos.
      </p>

      {favorites.length === 0 ? (
        <p className="text-center text-red-500 text-xl py-10">
          No has marcado ningún producto como favorito.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Link to={`/product/${formatNameForUrl(product.name)}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <Link
                to={`/product/${formatNameForUrl(product.name)}`}
                href="#"
                className="text-xl font-bold mt-4 underline"
              >
                {product.name}
              </Link>
              <p className="text-gray-700 my-2">
                {formatPriceCLP(product.price)}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Talla:</strong> {product.size.toUpperCase()}
              </p>
              <button
                onClick={() =>
                  handleRemoveFromFavorites(product.id, product.size)
                }
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
              >
                Quitar de favoritos
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
