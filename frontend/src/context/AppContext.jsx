import React, { createContext, useState } from "react";

export const AppContext = createContext();

const initialUser = {
  email: null,
  rol: null,
};

const initialToken = null;

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [token, setToken] = useState(initialToken);
  /*   const [] = useState();
  const [] = useState(); */

  const logout = () => {
    setUser(initialUser);
    setToken(initialToken);
  };

  const login = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const globalState = {
    user,
    token,
    logout,
    login,
  };

  return (
    <AppContext.Provider value={globalState}>{children}</AppContext.Provider>
  );
};
