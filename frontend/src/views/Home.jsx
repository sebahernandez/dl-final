import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ProductsList } from "../components/product-list/ProductList";

export const Home = () => {
  const { user } = useContext(AppContext);

  return (
    <div>
      <ProductsList />
    </div>
  );
};
