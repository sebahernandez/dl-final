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

    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
        isFavorite: true,
      };

    case "REMOVE_FROM_CART":
      return removeItemFromState(state, "cartItems", action.payload.cartItems);

    case "REMOVE_FROM_FAVORITES":
      return removeItemFromState(state, "favorites", action.payload.favorites);

    default:
      return state;
  }
};

// Función auxiliar para eliminar un ítem del estado
const removeItemFromState = (state, itemKey, updatedItems) => {
  const isFavoriteUpdated =
    itemKey === "favorites" ? updatedItems.length > 0 : state.isFavorite;

  return {
    ...state,
    [itemKey]: updatedItems,
    isFavorite: isFavoriteUpdated,
  };
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

  const addToFavorites = (product) => {
    const existingProductIndex = state.favorites.findIndex(
      (item) => item.id === product.id && item.size === product.size
    );

    let updatedFavorites;

    if (existingProductIndex !== -1) {
      updatedFavorites = [...state.favorites];
      updatedFavorites[existingProductIndex].quantity += 1;
    } else {
      updatedFavorites = [...state.favorites, { ...product, quantity: 1 }];
    }

    // Actualizar los favoritos en el estado y sessionStorage
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    dispatch({
      type: "ADD_TO_FAVORITES",
      payload: { favorites: updatedFavorites },
    });
  };

  const removeFromFavorites = (id, size) => {
    const updatedFavorites = state.favorites.filter(
      (item) => item.id !== id || item.size !== size
    );

    // Actualizar los favoritos en el estado y sessionStorage
    sessionStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    dispatch({
      type: "REMOVE_FROM_FAVORITES",
      payload: { favorites: updatedFavorites },
    });
  };

  const globalState = useMemo(
    () => ({
      user: state.user, // Estado para el usuario
      token: state.token, // Estado para el token de autenticación
      storeProducts: state.storeProducts, // Estado para los productos generales
      cartItems: state.cartItems, // Estado para los productos en el carrito
      favorites: state.favorites, // Estado para los productos favoritos
      isFavorite: state.isFavorite, // Estado para controlar si el producto está en favoritos
      setProducts, // Función para actualizar productos generales
      addToCart, // Función para añadir productos al carrito
      removeFromCart, // Función para eliminar productos del carrito
      login, // Función para iniciar sesión
      logout, // Función para cerrar sesión
      addToFavorites, // Función para añadir productos a favoritos
      removeFromFavorites, // Función para eliminar productos de favoritos
    }),
    [
      state.user,
      state.token,
      state.storeProducts,
      state.cartItems,
      state.favorites,
      state.isFavorite,
    ]
  );

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
