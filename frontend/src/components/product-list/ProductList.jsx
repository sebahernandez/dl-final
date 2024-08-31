import React, { useState, useEffect } from "react";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/data/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg shadow-lg p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-50 object-cover rounded-md"
          />
          <h2 className="text-xl font-bold mt-4">{product.name}</h2>
          <p className="text-lg font-semibold text-stone-600 mt-4">
            ${product.price.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">Stock: {product.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
