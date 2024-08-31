import React from "react";

export const TopBar = ({ user }) => {
  return (
    <div className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {user?.email ? (
            <p className="text-lg">Bienvenido ({user.email})</p>
          ) : (
            <p className="text-lg">Debes realizar tu login!</p>
          )}
        </div>
      </div>
    </div>
  );
};
