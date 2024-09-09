import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Navbar } from "../navbar/Navbar";
import { TopBar } from "../topbar/TopBar";

export const Header = ({ cartItemCount }) => {
  const { user } = useContext(AppContext);

  return (
    <div className="header">
      <TopBar user={user} />
      <Navbar cartItemCount={cartItemCount} />
    </div>
  );
};
