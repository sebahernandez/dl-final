import PropTypes from "prop-types";
import React, { createContext, useReducer, useMemo } from "react";

export const AppContext = createContext();

const initialState = {
  user: JSON.parse(sessionStorage.getItem("user")) ?? {
    email: null,
    rol: null,
  },
  token: sessionStorage.getItem("token") ?? null,
  cartItems: JSON.parse(sessionStorage.getItem("cartItems")) ?? [],
  favorites: JSON.parse(sessionStorage.getItem("favorites")) ?? [],
};

// Reducer para manejar el estado de usuario y token
const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          email: null,
          rol: null,
        },
        token: null,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const existingProductIndex = prevCartItems.findIndex(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingProductIndex !== -1) {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[existingProductIndex].quantity += 1;
        return updatedCartItems;
      } else {
        return [...prevCartItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Función para iniciar sesión y guardar en sessionStorage
  const login = (user, token) => {
    // Guardar en sessionStorage
    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);

    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  // Función para cerrar sesión, eliminar de sessionStorage y limpiar el carrito
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");

    dispatch({ type: "LOGOUT" });
  };

  const loadCartItems = (cartItems) => {
    dispatch({ type: "ADD_TO_CART", payload: { cartItems } });
  };

  const globalState = useMemo(
    () => ({
      user: state.user,
      token: state.token,
      cartItems: state.cartItems,
      login,
      logout,
      addToCart,
      loadCartItems,
    }),
    [state.user, state.token, state.cartItems]
  );

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
