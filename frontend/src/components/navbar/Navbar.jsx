import React from "react";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between">
          {/* Logo */}
          <div className="flex space-x-4">
            <div>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center py-5 px-2 text-blue-600 font-bold"
                    : "flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                }
              >
                <svg
                  className="h-6 w-6 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M13 5v6a4 4 0 01-8 0V5m10 7l2 2m0 0l7 7-7-7m0 0l-2 2"
                  />
                </svg>
                <span className="font-bold">Ecommerce</span>
              </NavLink>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-blue-600 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-blue-600 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900"
              }
            >
              Shop
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-blue-600 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "py-5 px-3 text-blue-600 font-bold"
                  : "py-5 px-3 text-gray-700 hover:text-gray-900"
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Secondary Navigation */}
          <div className="hidden md:flex items-center space-x-3">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-3 bg-blue-600 text-white rounded font-bold"
                  : "py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-400"
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-3 bg-blue-600 text-white rounded font-bold"
                  : "py-2 px-3 bg-blue-500 text-white rounded hover:bg-blue-400"
              }
            >
              Register
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "py-2 px-3 text-blue-600 font-bold"
                  : "py-2 px-3 text-gray-700 hover:text-gray-900"
              }
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5m0 0h12m-12 0l2-5m10 5l2-5m-2 5h-6m6 0l-2 5"
                />
              </svg>
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
