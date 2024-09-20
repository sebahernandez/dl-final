import React, { useState } from "react";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState, // Mantén los valores anteriores
      [name]: value, // Actualiza solo el campo que está cambiando
    }));
  };

  // Verifica si estás en modo desarrollo o producción
  const isDevelopment = import.meta.env.MODE === "development";

  // Define la baseUrl según el entorno
  const baseUrl = isDevelopment
    ? "http://localhost:3000" // URL para entorno de desarrollo
    : import.meta.env.VITE_BASE_URL; // URL para entorno de producción

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/contact/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Correo enviado con éxito.");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setResponseMessage("Hubo un problema al enviar el correo.");
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("Ocurrió un error al enviar el correo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row py-[100px]">
      <div className="w-full md:w-1/2  p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Contacto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tu correo electrónico"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="message"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tu mensaje"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className={`w-full py-2 px-4 font-semibold rounded-md text-white ${
                loading ? "bg-gray-400" : "bg-black hover:bg-slate-700"
              }`}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </div>
        </form>
        {responseMessage && (
          <p className="mt-4 text-center font-bold">{responseMessage}</p>
        )}
      </div>
      <div className="w-full md:w-1/2 p-5">
        <h2 className="text-2xl font-bold py-5">
          Solicita información tus compras
        </h2>
        <p>
          <strong>Bienvenido a Sneakers Shop</strong>, tu tienda virtual de
          confianza para las mejores zapatillas deportivas. Ofrecemos una amplia
          variedad de marcas y modelos para todos los gustos y necesidades.
          Desde las últimas tendencias en moda urbana hasta el calzado más
          cómodo para tus entrenamientos diarios, en Sneakers Shop encontrarás
          lo que buscas. ¡Explora nuestra colección y descubre ofertas
          exclusivas!
        </p>
      </div>
    </div>
  );
};

export default Contact;
