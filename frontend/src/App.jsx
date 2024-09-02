import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Shop,
  About,
  Contact,
  Login,
  Register,
  NotFound,
  ProductDetails,
} from "./views";
import { RootLayout } from "./layouts/RootLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:name" element={<ProductDetails />} />
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
