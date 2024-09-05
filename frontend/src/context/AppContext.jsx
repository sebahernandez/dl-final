import PropTypes from "prop-types";
import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AppContext = createContext();

const initialState = {
  user: {
    email: null,
    rol: null,
  },
  token: null,
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
    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    return storedCartItems;
  });

  // Restaurar usuario, token y carrito desde sessionStorage cuando el componente se monta
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const storedToken = sessionStorage.getItem("token");
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems"));

    if (storedUser && storedToken) {
      dispatch({
        type: "LOGIN",
        payload: {
          user: storedUser,
          token: storedToken,
        },
      });
    }

    // Restaurar carrito desde sessionStorage
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  // Guardar productos del carrito en sessionStorage cada vez que cambie el carrito
  useEffect(() => {
    if (cartItems.length > 0) {
      sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      sessionStorage.removeItem("cartItems"); // Si el carrito está vacío, lo eliminamos del sessionStorage
    }
  }, [cartItems]);

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

  const globalState = useMemo(
    () => ({
      user: state.user,
      token: state.token,
      cartItems,
      login,
      logout,
      addToCart,
    }),
    [state.user, state.token, cartItems]
  );

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
