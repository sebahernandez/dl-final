import { NavLink, Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-lime-600">
      <div className="container px-4 mx-auto">
        <div className="pt-24 pb-11 mx-auto max-w-4xl">
          <Link to="/" className="block md:mx-auto mb-5 max-w-max">
            <span className="font-bold text-4xl text-white">
              Snekers Store👟
            </span>
          </Link>
          <div className="flex flex-wrap justify-center -mx-3 lg:-mx-6">
            <div className="w-full md:w-auto p-3 md:px-6">
              <NavLink
                to="/"
                className="inline-block text-lg text-white hover:text-gray-300 font-medium"
              >
                Incio
              </NavLink>
            </div>
            <div className="w-full md:w-auto p-3 md:px-6">
              <NavLink
                to="/shop"
                className="inline-block text-lg text-white hover:text-gray-300 font-medium"
              >
                Shop
              </NavLink>
            </div>
            <div className="w-full md:w-auto p-3 md:px-6">
              <NavLink
                className="inline-block text-lg text-white hover:text-gray-300 font-medium"
                to="/about"
              >
                Nosotros
              </NavLink>
            </div>
            <div className="w-full md:w-auto p-3 md:px-6">
              <NavLink
                to="/contact"
                className="inline-block text-lg text-white hover:text-gray-300 font-medium"
              >
                Contacto
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-100"></div>
      <div className="container px-4 mx-auto">
        <p className="py-10 md:pb-20 text-md text-white font-medium text-center">
          © 2023 Proyecto Final - Desafio Latam - G53.
        </p>
      </div>
    </footer>
  );
};
