import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { formatPriceCLP } from "../../utils/format-price/formatPrice";

export function Filters({
  priceRange,
  setPriceRange,
  category,
  setCategory,
  gender,
  setGender,
  search,
  setSearch,
}) {
  const [searchTerm, setSearchTerm] = useState(search);

  const handlerPriceRange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handlerCategory = (e) => {
    setCategory(e.target.value);
  };

  const handlerGender = (e) => {
    setGender(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearch = useCallback(
    debounce((term) => setSearch(term), 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => debouncedSearch.cancel();
  }, [searchTerm, debouncedSearch]);

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-5 bg-gray-100 rounded p-3">
      <div className="w-full flex flex-col px-3">
        <label htmlFor="price" className="text-lg font-semibold mb-3">
          Precio:
        </label>
        <input
          type="range"
          id="price"
          name="price"
          min="0"
          max="160000"
          onChange={handlerPriceRange}
          className="w-full h-2 bg-gray-300 rounded-sm appearance-none cursor-pointer accent-stone-600"
        />
        <span className="py-3 font-bold">{formatPriceCLP(priceRange)}</span>
      </div>

      <div className="w-full flex flex-col px-3">
        <label htmlFor="category" className="text-lg font-semibold mb-2">
          Categoría:
        </label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={handlerCategory}
          className="w-full px-3 py-2 bg-white  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <option value="all">Todas</option>
          <option value="Invierno">Invierno</option>
          <option value="Plataforma">Plataforma</option>
          <option value="Anchas">Anchas</option>
          <option value="Running">Running</option>
          <option value="Skate">Skate</option>
          <option value="Urbanas">Urbanas</option>
          <option value="Deportivas">Deportivas</option>
          <option value="Outdoor">Outdoors</option>
        </select>
      </div>

      <div className="w-full flex flex-col px-3">
        <label htmlFor="gender" className="text-lg font-semibold mb-2">
          Género:
        </label>
        <select
          name="gender"
          id="gender"
          value={gender}
          onChange={handlerGender}
          className="w-full px-3 py-2 bg-white  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
        >
          <option value="all">Todas</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
          <option value="Niño">Niño</option>
          <option value="Unisex">Unisex</option>
        </select>
      </div>

      <div className="flex flex-col px-3">
        <label htmlFor="search" className="text-lg font-semibold mb-2">
          Buscar:
        </label>
        <input
          type="text"
          placeholder="Buscar producto..."
          className="px-3 py-2 bg-white  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-stone-500"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </section>
  );
}

Filters.propTypes = {
  priceRange: PropTypes.number.isRequired,
  setPriceRange: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  gender: PropTypes.string.isRequired,
  setGender: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

function debounce(func, wait) {
  let timeout;
  const debouncedFunction = (...args) => {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debouncedFunction.cancel = () => {
    clearTimeout(timeout);
  };

  return debouncedFunction;
}
