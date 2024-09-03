import PropTypes from "prop-types";
import { formatPriceCLP } from "../../utils/format-price/formatPrice";

export function Filters({ priceRange, setPriceRange, category, setCategory }) {
  const handlerPriceRange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handlerCategory = (e) => {
    setCategory(e.target.value);
  };

  return (
    <section className="flex flex-col sm:flex-row gap-5 items-center justify-between bg-stone-100 py-10 px-5 rounded-md shadow-sm">
      <div className="flex flex-col items-center sm:items-start">
        <label htmlFor="price" className="text-lg font-semibold mb-2">
          Precio
        </label>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="160000"
          onChange={handlerPriceRange}
          className="w-full sm:w-64 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-stone-600"
        />
        <span className="py-3 font-bold">{formatPriceCLP(priceRange)}</span>
      </div>

      <div className="flex flex-col items-center sm:items-start">
        <label htmlFor="category" className="text-lg font-semibold mb-2">
          Categoría
        </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handlerCategory}
          className="w-full sm:w-64 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas</option>
          <option value="Running">Running</option>
          <option value="Urbanas">Urbanas</option>
          <option value="Skate">Skate</option>
          <option value="Outdoors">Outdoors</option>
        </select>
      </div>
    </section>
  );
}

Filters.propTypes = {
  priceRange: PropTypes.number.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};
