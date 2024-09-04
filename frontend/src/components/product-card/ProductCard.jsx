import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatPriceCLP } from "../../utils/format-price/formatPrice";

export const ProductCard = ({ product }) => {
  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

  return (
    <div className="border rounded-lg shadow-sms p-4">
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
        {formatPriceCLP(product.price)}
      </p>
      <p className="text-sm text-gray-600"> {product.marca}</p>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    marca: PropTypes.string.isRequired,
  }).isRequired,
};
