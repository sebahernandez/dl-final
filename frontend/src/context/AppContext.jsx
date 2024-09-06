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
  storeProducts: [],
};

// Reducer para manejar el estado de usuario y token
const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        ...state,
        storeProducts: action.payload.products,
      };
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

    case "REMOVE_FROM_CART":
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

  // Función para iniciar sesión y guardar en sessionStorage
  const login = (user, token) => {
    // Limpiar el carrito al iniciar sesión
    sessionStorage.removeItem("cartItems");

    sessionStorage.setItem("user", JSON.stringify(user));
    sessionStorage.setItem("token", token);
    dispatch({ type: "LOGIN", payload: { user, token } });

    // Opcional: Limpiar el estado del carrito
    dispatch({ type: "ADD_TO_CART", payload: { cartItems: [] } });
  };

  // Función para cerrar sesión, eliminar de sessionStorage y limpiar el carrito
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("cartItems");
    dispatch({ type: "LOGOUT" });
  };

  const loadCartItems = (cartItems) => {
    dispatch({ type: "ADD_TO_CART", payload: { cartItems } });
  };

  // Función para actualizar los productos generales de la tienda
  const setProducts = (products) => {
    dispatch({ type: "SET_PRODUCTS", payload: { products } });
  };

  const addToCart = (product) => {
    const existingProductIndex = state.cartItems.findIndex(
      (item) => item.id === product.id && item.size === product.size
    );

    let updatedCartItems;

    if (existingProductIndex !== -1) {
      updatedCartItems = [...state.cartItems];
      updatedCartItems[existingProductIndex].quantity += 1;
    } else {
      updatedCartItems = [...state.cartItems, { ...product, quantity: 1 }];
    }

    // Actualizar el carrito en el estado y sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    dispatch({
      type: "ADD_TO_CART",
      payload: { cartItems: updatedCartItems },
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (id, size) => {
    const updatedCartItems = state.cartItems.filter(
      (item) => item.id !== id || item.size !== size
    );

    // Actualizar el carrito en el estado y sessionStorage
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { cartItems: updatedCartItems },
    });
  };

  const globalState = useMemo(
    () => ({
      user: state.user, // Estado para el usuario
      token: state.token, // Estado para el token de autenticación
      storeProducts: state.storeProducts, // Estado para los productos generales
      cartItems: state.cartItems, // Estado para los productos en el carrito
      setProducts, // Función para actualizar productos generales
      addToCart, // Función para añadir productos al carrito
      removeFromCart, // Función para eliminar productos del carrito
      login, // Función para iniciar sesión
      logout, // Función para cerrar sesión
    }),
    [state.user, state.token, state.storeProducts, state.cartItems]
  );

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
