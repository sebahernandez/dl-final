import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useContext(AppContext);

  const handleRemoveFromFavorites = (id, size) => {
    removeFromFavorites(id, size);
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
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-500 mb-4">{product.price}</p>
              <button
                onClick={() =>
                  handleRemoveFromFavorites(product.id, product.size)
                }
                className="w-full bg-stone-500 text-white py-2 px-4 rounded-md hover:bg-stone-600 transition-colors"
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
