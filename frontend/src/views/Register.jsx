import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const Register = () => {
  const { login } = useContext(AppContext); // Importa la función login desde el contexto
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const { user } = data;

        login(user);
        navigate("/");
        toast.success(`${user.email} registrado con exito`, {
          position: "bottom-right",
        });
      } else {
        console.error("Error en el registro:", data.message);
        toast.error(data.message || "Error en el registro", {
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
    }
  };

  const background = {
    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%,rgba(0,0,0,0.5) 100%),url(img/bg/bg-login.webp)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section style={background}>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Crear tu cuenta
          </h2>
          <form onSubmit={handleRegister} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
              />
            </div>
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-stone-500 focus:border-stone-500 sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-stone-600 text-white py-2 px-4 rounded-md hover:bg-stone-700 focus:outline-none focus:ring-2 focus:ring-stone-500 focus:ring-offset-2"
            >
              Enviar
            </button>
          </form>
          <div>
            <p className="mt-4 text-sm text-gray-600 text-center">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/login"
                className="font-medium text-stone-600 hover:text-stone-500"
              >
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
