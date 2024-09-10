import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 text-center h-[100vh] flex justify-center items-center flex-col">
      <h1 className="text-8xl font-bold">404 🚫</h1>
      <p className="text-xl mt-4">
        Oops! Parece que la página que buscas no existe.
      </p>
      <Link to="/" className="mt-6 text-blue-500 hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
