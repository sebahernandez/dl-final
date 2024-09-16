import PropTypes from "prop-types";
import React, { createContext, useReducer, useMemo, useEffect } from "react";

export const AppContext = createContext();

const user = JSON.parse(localStorage.getItem("user")) ?? {
  email: null,
  rol: null,
};

const initialState = {
  user,
  token: localStorage.getItem("token") ?? null,
  cartItems: user.email
    ? JSON.parse(localStorage.getItem(`cartItems_${user.email}`)) ?? []
    : [],
  favorites: user.email
    ? JSON.parse(localStorage.getItem(`favorites_${user.email}`)) ?? []
    : [],
  storeProducts: [],
  isFavorite: false,
};

// Reducer para manejar el estado de usuario y token
const appReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
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
        cartItems: [], // Reiniciar el carrito
        favorites: [], // Reiniciar favoritos
        isFavorite: false,
      };
    /*     case "ADD_TO_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
 */
    case "SET_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
      };

    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
        isFavorite: true,
      };

    /*  case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: action.payload.cartItems,
      }; */

    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: action.payload.favorites,
        isFavorite: false,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    loadUserData();
  }, [state.user.email]);

  const loadUserData = () => {
    if (state.user.email) {
      const cartItems =
        JSON.parse(localStorage.getItem(`cartItems_${state.user.email}`)) ?? [];
      dispatch({ type: "SET_CART_ITEMS", payload: { cartItems } });

      const favorites =
        JSON.parse(localStorage.getItem(`favorites_${state.user.email}`)) ?? [];
      dispatch({ type: "SET_FAVORITES", payload: { favorites } });
    }
  };

  const login = (user, token) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);

    const cartItems =
      JSON.parse(localStorage.getItem(`cartItems_${user.email}`)) ?? [];

    dispatch({ type: "LOGIN", payload: { user, token } });
    dispatch({ type: "SET_CART_ITEMS", payload: { cartItems } });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
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

    // Guardamos en localStorage usando la clave del usuario
    if (state.user.email) {
      localStorage.setItem(
        `cartItems_${state.user.email}`,
        JSON.stringify(updatedCartItems)
      );
    }

    // Actualizamos el estado
    dispatch({
      type: "SET_CART_ITEMS",
      payload: { cartItems: updatedCartItems },
    });
  };

  // Función para eliminar productos del carrito
  const removeFromCart = (id, size) => {
    const updatedCartItems = state.cartItems.filter(
      (item) => !(item.id === id && item.size === size)
    );

    // Actualizamos en localStorage
    if (state.user.email) {
      localStorage.setItem(
        `cartItems_${state.user.email}`,
        JSON.stringify(updatedCartItems)
      );
    }

    // Actualizamos el estado
    dispatch({
      type: "SET_CART_ITEMS",
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

    // Guardar los favoritos en localStorage usando la clave del usuario
    if (state.user.email) {
      localStorage.setItem(
        `favorites_${state.user.email}`,
        JSON.stringify(updatedFavorites)
      );
    }

    dispatch({
      type: "ADD_TO_FAVORITES",
      payload: { favorites: updatedFavorites },
    });
  };

  const removeFromFavorites = (id, size) => {
    const updatedFavorites = state.favorites.filter(
      (item) => !(item.id === id && item.size === size)
    );

    // Guardar los favoritos actualizados en localStorage usando la clave del usuario
    if (state.user.email) {
      localStorage.setItem(
        `favorites_${state.user.email}`,
        JSON.stringify(updatedFavorites)
      );
    }

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
