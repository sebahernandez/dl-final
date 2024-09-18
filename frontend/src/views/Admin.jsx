import React, { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../context/AppContext";
import { Logout } from "../components/logout/Logout";

const Admin = () => {
  const { user } = useContext(AppContext);

  // Estado para manejar los datos del nuevo producto
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productImage, setProductImage] = useState("");
  const [productSizes, setProductSizes] = useState([]);
  const [productStock, setProductStock] = useState(0);
  const [productMarca, setProductMarca] = useState("");
  const [productGender, setProductGender] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(0);

  console.log("Product Sizes:", productSizes);
  console.log("Selected Category:", selectedCategory);

  // Referencia al formulario para usar reset()
  const formRef = useRef(null);

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Cargar categorías al montar el componente
  useEffect(() => {
    fetchCategories();
  }, []);

  // Obtener todos los productos de la base de datos
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products"); // Ajusta esta ruta según tu servidor
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Obtener todas las categorías de la base de datos
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:3000/categories"); // Ajusta esta ruta según tu servidor
      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("La respuesta no es un arreglo:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setCategories([]);
    }
  };

  // Añadir un nuevo producto
  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("selectedCategory (debería ser categoryid):", selectedCategory);

    const newProduct = {
      name: productName,
      description: productDescription,
      price: parseInt(productPrice),
      image: productImage,
      sizes: JSON.stringify(productSizes),
      stock: parseInt(productStock),
      brand: productMarca,
      category: selectedCategory,
      gender: productGender,
    };
    console.log("Objeto actualizado:", newProduct);
    try {
      const response = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        fetchProducts(); // Actualiza la lista de productos
        formRef.current.reset(); // Restablece los campos del formulario
      } else {
        console.error("Error al añadir producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Editar un producto existente
  const handleEditProduct = async (id) => {
    const updatedProduct = {
      name: productName,
      description: productDescription,
      price: parseInt(productPrice),
      image: productImage,
      sizes: JSON.stringify(productSizes),
      stock: parseInt(productStock),
      brand: productMarca,
      category: selectedCategory,
      gender: productGender,
    };
    console.log("Objeto actualizado:", updatedProduct);
    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        fetchProducts(); // Actualiza la lista de productos
        formRef.current.reset(); // Restablece los campos del formulario
        setEditProductId(null); // Salir del modo edición
      } else {
        console.error("Error al editar producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Eliminar un producto
  const handleDeleteProduct = async (productid) => {
    try {
      const response = await fetch(
        `http://localhost:3000/products/${productid}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        fetchProducts(); // Actualiza la lista de productos
        console.log("Producto eliminado con éxito");
      } else {
        console.error("Error al eliminar producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Llenar el formulario para editar un producto
  const handleEditClick = (product) => {
    setProductName(product.name);
    setProductDescription(product.description);
    setProductPrice(product.price);
    setProductImage(product.image);
    setProductSizes(product.sizes);
    setProductStock(product.stock);
    setProductMarca(product.brand);
    setSelectedCategory(product.categoryid);
    setProductGender(product.gender);
    setEditProductId(product.productid);
  };

  // Función para manejar el cambio de categoría seleccionada
  const handleCategoryChange = (e) => {
    setSelectedCategory(parseInt(e.target.value));
  };

  return (
    <section className="container mx-auto flex flex-row justify-between items-start h-auto p-4">
      {/* Panel de administración */}
      <div className="w-1/2 p-4">
        <h2 className="text-2xl">Welcome, {user.email}!</h2>
        <Logout />

        {/* Lista de productos */}
        <h3 className="text-xl mb-4 mt-5">Lista de productos</h3>
        <ul>
          {products.map((product, index) => (
            <li key={product.productid} className="mb-4 border-b pb-4">
              <div className="flex items-start">
                <div className="w-1/4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="w-3/4 pl-4">
                  <p className="font-bold text-lg">{product.name}</p>
                  <p>
                    <strong className="text-slate-500">Descripción:</strong>
                    {product.description}
                  </p>
                  <p>
                    <strong className="text-slate-500">Marca:</strong>{" "}
                    {product.brand}{" "}
                  </p>
                  <p>
                    <strong className="text-slate-500">Precio:</strong> $
                    {product.price}
                  </p>
                  <p>
                    <strong className="text-slate-500">Stock:</strong>{" "}
                    {product.stock}
                  </p>
                  <p>
                    <strong className="text-slate-500">Tallas:</strong>{" "}
                    {Array.isArray(product.sizes)
                      ? product.sizes.join(", ")
                      : "No disponible"}
                  </p>
                  <p>
                    <strong className="text-slate-500">Categoría:</strong>{" "}
                    {product.category}
                  </p>
                  <p>
                    <strong className="text-slate-500">Genero:</strong>{" "}
                    {product.gender}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="mr-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.productid)}
                      className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Formulario de productos */}
      <div className="w-1/2 p-4 bg-gray-100 rounded shadow">
        <h3 className="text-xl mb-4">
          {editProductId ? "Editar producto" : "Añadir nuevo producto"}
        </h3>
        <form
          ref={formRef}
          onSubmit={
            editProductId
              ? (e) => handleEditProduct(editProductId)
              : handleAddProduct
          }
        >
          {/* Nombre del producto */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Descripción */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Descripción
            </label>
            <textarea
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          {/* Precio */}
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Imagen */}
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Tallas */}
          <div className="mb-4">
            <label
              htmlFor="sizes"
              className="block text-sm font-medium text-gray-700"
            >
              Tallas (separadas por comas)
            </label>
            <input
              type="text"
              value={productSizes}
              onChange={(e) =>
                setProductSizes(
                  e.target.value.split(",").map((size) => size.trim())
                )
              }
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          {/* Stock */}
          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
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

          {/* Marca */}
          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <input
              type="text"
              value={productMarca} // Aquí deberías capturar correctamente el valor de la marca
              onChange={(e) => setProductMarca(e.target.value)} // Asegúrate de que setProductMarca esté siendo llamado
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            />
          </div>

          {/* Categoría */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange} // Convertir el valor seleccionado a número
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            >
              <option value="">Seleccionar categoría</option>
              {categories.map((category) => (
                <option key={category.categoryid} value={category.categoryid}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Género */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
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
              <option value="nino">Niño</option>
              <option value="unisex">Unisex</option>
            </select>
          </div>

          {/* Botón para enviar el formulario */}
          <button
            type="submit"
            className="w-full bg-stone-600 text-white py-2 px-4 rounded-md hover:bg-stone-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-600"
          >
            {editProductId ? "Guardar Cambios" : "Añadir Producto"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Admin;
