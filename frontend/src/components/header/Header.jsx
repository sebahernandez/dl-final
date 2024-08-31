import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Navbar } from "../navbar/Navbar";
import { TopBar } from "../topbar/TopBar";

export const Header = () => {
  const { user } = useContext(AppContext);
  console.log(user);
  return (
    <div className="header">
      <TopBar user={user} />
      <Navbar />
    </div>
  );
};
