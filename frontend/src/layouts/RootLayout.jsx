import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

export const RootLayout = () => {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4">
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  );
};
