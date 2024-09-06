import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Shop,
  About,
  Contact,
  Login,
  Register,
  NotFound,
  Admin,
  ProductDetails,
  Cart,
} from "./views";
import { RootLayout } from "./layouts/RootLayout";
import { ProtectedRoute } from "./components/protected-route/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import { ToastContainer } from "react-toastify"; // Importar ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importar el CSS de Toastify

function App() {
  const [cartItems, setCartItems] = useState([]);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    //Buscar si el producto ya existe en el carrito con el mismo ID y tamaño
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingProductIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingProductIndex].quantity += 1;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (id, size) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== id || item.size !== size)
    );
  };

  return (
    <div>
      <AppProvider>
        <ToastContainer margin-top="50px" position="top-left" />
        <Routes>
          <Route
            path="/"
            element={<RootLayout cartItemCount={cartItems.length} />}
          >
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop addToCart={addToCart} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/product/:name"
              element={<ProductDetails addToCart={addToCart} />}
            />
            <Route
              path="/cart"
              element={
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              }
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </AppProvider>
    </div>
  );
}

export default App;
