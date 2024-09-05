import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { Footer } from "../components/footer/Footer";

export const RootLayout = ({ cartItemCount }) => {
  return (
    <div>
      <Header cartItemCount={cartItemCount} />
      <main>
        <Outlet /> {/* Aquí se renderizan las rutas hijas */}
      </main>
      <Footer />
    </div>
  );
};
