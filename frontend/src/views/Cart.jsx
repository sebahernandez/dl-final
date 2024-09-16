import React, { useContext } from "react";
import { formatPriceCLP } from "../utils/format-price/formatPrice";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { MdRemoveShoppingCart } from "react-icons/md";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(AppContext);
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  const formatNameForUrl = (name) => {
    return name.toLowerCase().replace(/ /g, "-");
  };

  return (
    <section className="container mx-auto p-4 h-auto py-10">
      <h2 className="text-4xl text-center font-bold mb-6 py-5">
        Tu Carrito de Compras
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm border-2 border-stone-100"
              >
                <Link to={`/product/${formatNameForUrl(item.name)}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="flex-grow ml-4">
                  <Link
                    to={`/product/${formatNameForUrl(item.name)}`}
                    className="font-bold text-xl undeline"
                  >
                    {item.name}
                  </Link>
                  <p className="text-gray-600">
                    <strong>Precio:</strong> {formatPriceCLP(item.price)}
                  </p>
                  <p className="text-gray-600">
                    <strong>Cantidad:</strong> {item.quantity}
                  </p>
                  <p className="text-gray-600">
                    <strong>Talla:</strong> {item.size}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)} // Eliminamos basado en id y size
                  className="border-2 border-rose-600 text-rose-600 px-4 py-2 rounded-md hover:bg-red-600 hover:text-white flex items-center justify-center"
                >
                  <MdRemoveShoppingCart className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Sección de resumen del carrito */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold mb-4">Resumen del Pedido</h3>
            <p className="text-lg mb-2">
              Total:{" "}
              <span className="font-semibold">
                {formatPriceCLP(calculateTotal())}
              </span>
            </p>
            <button className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
