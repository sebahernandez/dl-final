import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IconCart } from "../icons/IconCart";
import { FavoritesIcon } from "../icons/FavoritesIcon";
import { AppContext } from "../../context/AppContext";

export const Navbar = () => {
  const { cartItems } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useContext(AppContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogoutAndRedirect = async () => {
    try {
      await logout(); // Cierra la sesión, espera si es asíncrono
      setDropdownOpen(false); // Cierra el dropdown
      navigate("/login"); // Redirige a la página de login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex space-x-4">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-5 text-slate-600 font-bold"
                    : "flex items-center py-5 text-slate-700 hover:text-slate-900"
                }
              >
                <span className="font-bold text-4xl text-black">
                  SnekersStore 👟
                </span>
              </NavLink>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-stone-500 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900 font-bold"
              }
            >
              Inicio
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-stone-500 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900 font-bold"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-stone-500 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900 font-bold"
              }
            >
              Nosotros
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-stone-500 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900 font-bold"
              }
            >
              Contacto
            </NavLink>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-3 relative">
            <NavLink to="/register">Crea tu cuenta</NavLink>

            <NavLink>
              <div className="relative">
                {user?.email ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="text-lg flex items-center gap-2"
                    >
                      {user.email}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <button
                          onClick={handleLogoutAndRedirect}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Cerrar sesión
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink to="/login">Ingresar</NavLink>
                )}
              </div>
            </NavLink>

            <NavLink to="/favorites">
              <FavoritesIcon />
            </NavLink>

            <NavLink to="/cart">
              <IconCart />
              {cartItems.length > 0 && (
                <span className="absolute top-6 -right-2 w-5 h-5 text-center bg-red-500 text-white rounded-full text-sm flex justify-center items-center ">
                  {cartItems.length}
                </span>
              )}
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              <svg
                className="w-6 h-6 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu hidden md:hidden">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
        >
          Shop
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};
