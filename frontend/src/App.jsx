import React, { useContext } from "react";
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
  Favorites,
} from "./views";
import { RootLayout } from "./layouts/RootLayout";
import { ProtectedRoute } from "./components/protected-route/ProtectedRoute";
import { AppProvider, AppContext } from "./context/AppContext";
import { ToastContainer } from "react-toastify"; // Importar ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importar el CSS de Toastify

function App() {
  const { cartItems } = useContext(AppContext);

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
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:name" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="*" element={<NotFound />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="administrador">
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
