import { Link } from "react-router-dom";

export const ProductCard = ({ product }) => {
  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-50 object-cover rounded-md"
      />
      <Link
        to={`/product/${formatNameForUrl(product.name)}`}
        href="#"
        className="text-xl font-bold mt-4 underline"
      >
        {product.name}
      </Link>
      <p className="text-lg font-semibold text-stone-600 mt-4">
        ${product.price.toLocaleString()}
      </p>
      <p className="text-sm text-gray-600"> {product.marca}</p>
    </div>
  );
};
