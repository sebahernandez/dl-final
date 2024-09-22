import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { Logout } from "../components/logout/Logout";
import { toast } from "react-toastify";

const Admin = () => {
  // Obtener el usuario actual del contexto
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

  // Cargar productos al montar el componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Cargar categorías al montar el componente
  useEffect(() => {
    console.log("useEffect ejecutándose para cargar las categorías...");
    fetchCategories();
  }, []);

  // Función para resetear los campos del formulario
  const resetFormFields = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice(0);
    setProductImage("");
    setProductSizes([]);
    setProductStock(0);
    setProductMarca("");
    setProductGender("");
    setSelectedCategory(0);
    setEditProductId(0); // Salir del modo edición
  };

  // Verifica si estás en modo desarrollo o producción
  const isDevelopment = import.meta.env.MODE === "development";

  // Define las URLs según el entorno
  const urlProducts = isDevelopment
    ? "http://localhost:3000/products" // URL para entorno de desarrollo
    : import.meta.env.VITE_BASE_URL + "/products"; // URL para entorno de producción

  const urlCategories = isDevelopment
    ? "http://localhost:3000/categories" // URL para entorno de desarrollo
    : import.meta.env.VITE_BASE_URL + "/categories"; // URL para entorno de producción

  console.log("URL de categorías:", urlCategories);

  // Obtener todos los productos de la base de datos
  const fetchProducts = async () => {
    try {
      const response = await fetch(urlProducts);

      if (!response.ok) {
        throw new Error(
          `Error en la red: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length === 0) {
        console.log("No hay productos disponibles.");
      }
      setProducts(data); // Si no hay productos, simplemente establecerá un array vacío
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setProducts([]); // En caso de error, asegurarse de que products esté vacío
    }
  };

  // Obtener todas las categorías de la base de datos
  const fetchCategories = async () => {
    try {
      console.log("Intentando obtener las categorías...");

      const response = await fetch(urlCategories);
      console.log("Response status:", response.status); // Verifica el código de estado de la respuesta

      if (!response.ok) {
        throw new Error(
          `Error en la red: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Datos de categorías obtenidos:", data); // Muestra los datos obtenidos

      if (Array.isArray(data)) {
        setCategories(data); // Actualiza el estado con las categorías
      } else {
        console.error("La respuesta no es un arreglo de categorías", data);
        setCategories([]); // Establece un array vacío si la respuesta no es un array válido
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setCategories([]); // En caso de error, establece el estado como un array vacío
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
      const response = await fetch(urlProducts, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        fetchProducts(); // Actualiza la lista de productos
        resetFormFields(); // Resetea los campos del formulario
        toast.success("Producto añadido con éxito"); // Añadir un mensaje de éxito
      } else {
        console.error("Error al añadir producto");
        toast.error("Error al añadir producto"); // Añadir un mensaje de error
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
      const response = await fetch(`${urlProducts}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        fetchProducts(); // Actualiza la lista de productos
        resetFormFields(); // Resetea los campos del formulario
        setEditProductId(null); // Salir del modo edición
        toast.success("Producto actualizado con exito");
      } else {
        console.error("Error al editar producto");
        toast.error("Error al editar producto");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Eliminar un producto
  const handleDeleteProduct = async (productid) => {
    try {
      const response = await fetch(`${urlProducts}/${productid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchProducts(); // Actualiza la lista de productos
        console.log("Producto eliminado con éxito");
        toast.success("Producto eliminado con exito");
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
    <section className="container mx-auto flex flex-row justify-between items-start p-4 bg-white my-10 rounded-md">
      {/* Panel de administración */}
      <div className="w-1/2 p-4">
        {/* Lista de productos */}
        <h3 className="text-xl mb-4 mt-5 bg-gray-100 p-5 rounded-md">
          Catálogo de productos
        </h3>
        <ul style={{ height: "700px", overflowY: "auto" }}>
          {products.length > 0 ? (
            products.map((product) => (
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
                    <p className="font-bold text-lg my-3">{product.name}</p>
                    <p>
                      <strong className="text-black">Descripción:</strong>{" "}
                      {product.description}
                    </p>
                    <p>
                      <strong className="text-black">Marca:</strong>{" "}
                      {product.brand}{" "}
                    </p>
                    <p>
                      <strong className="text-black">Precio:</strong> $
                      {product.price}
                    </p>
                    <p>
                      <strong className="text-black">Stock:</strong>{" "}
                      {product.stock}
                    </p>
                    <p>
                      <strong className="text-black">Tallas:</strong>{" "}
                      {Array.isArray(product.sizes)
                        ? product.sizes.join(", ")
                        : "No disponible"}
                    </p>
                    <p>
                      <strong className="text-black">Categoría:</strong>{" "}
                      {product.category}
                    </p>
                    <p>
                      <strong className="text-black">Género:</strong>{" "}
                      {product.gender}
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="mr-2 bg-slate-700 text-white py-1 px-4 rounded hover:bg-slate-800"
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
            ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </ul>
      </div>

      {/* Formulario de productos */}
      <div className="w-1/2 p-4 bg-gray-100 rounded shadow my-10">
        <div className="py-5">
          <h2 className="text-2xl">Bienvenido, {user.email}!</h2>
          <Logout />
        </div>
        <h3 className="text-xl mb-4">
          {editProductId ? "Editar producto" : "Añadir nuevo producto"}
        </h3>
        <form
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
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
              min="0"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
              min="0"
              value={productStock}
              onChange={(e) => setProductStock(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
            {categories.length > 0 ? (
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                required
                className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category.categoryid} value={category.categoryid}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">No hay categorías disponibles.</p>
            )}
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
              className="mt-1 block w-full px-3 py-2  rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
            >
              <option value="">Seleccionar</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Niño">Niño</option>
              <option value="Unisex">Unisex</option>
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
