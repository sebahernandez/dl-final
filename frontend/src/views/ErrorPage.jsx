import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError(); // Hook para obtener el error ocurrido en la ruta
  console.error(error); // Opcional: puedes loggear el error para depuración

  return (
    <div className="container mx-auto px-4 text-center mt-20">
      <h1 className="text-4xl font-bold text-red-500">Oops!</h1>
      <p className="text-xl mt-4">Sorry, an unexpected error has occurred.</p>
      <p className="text-lg mt-4 text-gray-700">
        {error.statusText || error.message} {/* Mostrar el mensaje de error */}
      </p>
      <div className="mt-8">
        <a href="/" className="text-blue-500 hover:underline">
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default ErrorPage