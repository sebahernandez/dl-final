import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { IconCart } from "../icons/IconCart";
import { FavoritesIcon } from "../icons/FavoritesIcon";
import { AppContext } from "../../context/AppContext";

export const Navbar = () => {
  const { cartItems } = useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
      await logout();
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-5">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo (Izquierda) */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="flex items-center py-5 font-bold text-xl md:text-4xl text-black"
            >
              SnekersStore 👟
            </NavLink>
          </div>

          {/* Menú de Navegación (Centro) */}
          <div className="hidden md:flex md:flex-1 md:justify-center">
            <div className="flex items-center space-x-1">
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
                Tienda
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
          </div>

          {/* Navegación Secundaria (Derecha) */}
          <div className="flex items-center space-x-3">
            {/* Íconos de favoritos y carrito (Siempre visibles) */}
            <NavLink to="/favorites">
              <FavoritesIcon />
            </NavLink>

            <NavLink to="/cart" className="relative">
              <IconCart />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-sm flex justify-center items-center">
                  {cartItems.length}
                </span>
              )}
            </NavLink>

            {/* Ingreso de sesión (Solo en desktop) */}
            <div className="hidden md:flex items-center space-x-3 relative">
              {!user?.email && <NavLink to="/register">Crea tu cuenta</NavLink>}
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
            </div>

            {/* Botón de menú móvil (Solo en móvil) */}
            <div className="md:hidden">
              <button
                className="mobile-menu-button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
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
      </div>

      {/* Menú Móvil */}
      <div
        className={`mobile-menu ${mobileMenuOpen ? "" : "hidden"} md:hidden`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Tienda
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Nosotros
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "block py-2 px-4 text-sm bg-blue-600 text-white"
              : "block py-2 px-4 text-sm hover:bg-gray-200"
          }
          onClick={() => setMobileMenuOpen(false)}
        >
          Contacto
        </NavLink>
        {user?.email ? (
          <>
            <span className="block py-2 px-4 text-sm text-gray-700">
              {user.email}
            </span>
            <button
              onClick={handleLogoutAndRedirect}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 text-sm bg-blue-600 text-white"
                  : "block py-2 px-4 text-sm hover:bg-gray-200"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Ingresar
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "block py-2 px-4 text-sm bg-blue-600 text-white"
                  : "block py-2 px-4 text-sm hover:bg-gray-200"
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Crea tu cuenta
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};
