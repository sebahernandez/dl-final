import React from "react";
import { NavLink } from "react-router-dom";
import { IconCart } from "../icons/IconCart";
import { UserIcon } from "../icons/UserIcon";
import { FavoritesIcon } from "../icons/FavoritesIcon";

export const Navbar = ({ cartItemCount }) => {
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
                    ? "flex items-center py-5 text-stone-600 font-bold"
                    : "flex items-center py-5 text-gray-700 hover:text-gray-900"
                }
              >
                <span className="font-bold text-4xl text-stone-600">
                  Snekers<span className="text-stone-400">Shop</span>👟
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
            <NavLink to="/favorites">
              <FavoritesIcon />
            </NavLink>
            <NavLink to="/login">
              <UserIcon />
            </NavLink>

            <NavLink to="/cart">
              <IconCart />
              {cartItemCount > 0 && (
                <span className="absolute top-6 -right-2 w-5 h-5 text-center bg-red-500 text-white rounded-full text-sm flex justify-center items-center ">
                  {cartItemCount}
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
