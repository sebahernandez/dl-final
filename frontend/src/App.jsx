import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./views/Home";
import { Shop } from "./views/Shop";
import { About } from "./views/About";
import { Contact } from "./views/Contact";
import { Login } from "./views/Login";
import { Register } from "./views/Register";
import { NotFound } from "./views/NotFound";
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
          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
