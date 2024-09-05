import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Logout } from "../components/logout/Logout";
//import productsData from "../../public/data/products.json"; // Simulamos la importación del archivo JSON

const Admin = () => {
  const { user } = useContext(AppContext);

  // Estado para manejar los datos del nuevo producto
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productSizes, setProductSizes] = useState("");
  const [productStock, setProductStock] = useState("");
  const [productMarca, setProductMarca] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productGender, setProductGender] = useState("");
  const [products, setProducts] = useState(null); // Estado que contiene los productos del archivo JSON

  const handleAddProduct = (e) => {
    e.preventDefault();

    // Crear el nuevo producto
    /* const newProduct = {
      id: products.length + 1,
      name: productName,
      description: productDescription,
      price: Number(productPrice),
      image: productImage,
      sizes: productSizes.split(",").map((size) => size.trim()),
      gallery: [""], // Se puede ajustar para añadir una galería real
      stock: Number(productStock),
      marca: productMarca,
      category: productCategory,
      gender: productGender,
    }; */
  };

  return (
    <section className="container mx-auto flex flex-row justify-between items-start h-auto p-4">
      {/* Panel de administración del usuario */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl">Welcome, {user.email}!</h2>
        <p>Panel de administración</p>
        <p>Rol: {user.rol}</p>
        <Logout />
      </div>

      {/* Formulario para añadir productos */}
      <div className="w-1/2 p-4 bg-gray-100 rounded shadow">
        <h3 className="text-xl mb-4">Añadir nuevo producto</h3>
        <form onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nombre del producto
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Precio
            </label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Imagen (URL)
            </label>
            <input
              type="text"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Tallas (separadas por comas)
            </label>
            <input
              type="text"
              value={productSizes}
              onChange={(e) => setProductSizes(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Stock
            </label>
            <input
              type="number"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Marca
            </label>
            <input
              type="text"
              value={productMarca}
              onChange={(e) => setProductMarca(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Categoría
            </label>
            <input
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Género
            </label>
            <select
              value={productGender}
              onChange={(e) => setProductGender(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            >
              <option value="">Seleccionar</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-stone-600 text-white py-2 px-4 rounded-md hover:bg-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-600"
          >
            Añadir Producto
          </button>
        </form>
      </div>
    </section>
  );
};

export default Admin;
