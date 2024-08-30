import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const Home = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  return (
    <div>
      <h1>Home</h1>
      {user?.email ? (
        <p>Bienvenido ({user.email}) !</p>
      ) : (
        <p>Debes realizar tu login!</p>
      )}
    </div>
  );
};
