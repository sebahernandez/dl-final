import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

export const TopBar = ({ user }) => {
  const { logout } = useContext(AppContext); // Obtener logout desde el contexto
  const navigate = useNavigate(); // Para redirigir al login

  const handleLogout = () => {
    logout(); // Llamar a la función logout del contexto
    navigate("/login"); // Redirigir al usuario a la página de login
  };

  return (
    <div className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-center items-center text-center font-semibold">
        Despachos express 🚛 / Hasta 6 cuotas sin interés 💸 / Retira en tienda
        gratis 👟
        <div>
          {/*    {user?.email ? (
            <p className="text-lg">Bienvenido ({user.email})</p>
          ) : (
            <p className="text-lg">Debes realizar tu login!</p>
          )} */}
        </div>
        {/* Mostrar botón de cerrar sesión si el usuario está logueado */}
        {/*  {user?.email && (
          <button
            onClick={handleLogout}
            className="bg-stone-500 hover:bg-stone-400 text-white py-2 px-4 rounded"
          >
            Cerrar sesión
          </button>
        )} */}
      </div>
    </div>
  );
};
