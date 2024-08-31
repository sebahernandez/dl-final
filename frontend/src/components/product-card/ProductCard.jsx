export const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4">
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
  );
};
