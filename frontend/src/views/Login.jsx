import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const { login } = useContext(AppContext); // Usamos `login` desde el contexto
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user, token } = data;
        login(user, token);
        navigate("/");
      } else {
        const errorMessage =
          data?.message ||
          "Error en la autenticación. No se recibió un mensaje del servidor.";

        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
      toast.error(error.message, {
        position: "bottom-right",
      });
    }
  };

  const background = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.5) 100%),url(img/bg/bg-login.webp)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section style={background}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-stone-700 text-white py-2 px-4 rounded-md hover:bg-stone-600 focus:outline-none focus:ring-2 focus:stroke-stone-700 focus:ring-offset-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
