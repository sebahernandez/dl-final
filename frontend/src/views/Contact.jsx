import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="container mx-auto flex flex-col md:flex-row py-[100px]">
      <div className="w-full md:w-1/2  p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Contacto</h1>
        <form
          action="https://formsubmit.co/sebaprogramer@gmail.com"
          method="POST"
        >
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Tu mensaje"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          </div>
        </form>
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
