import React from "react";
import { formatPriceCLP } from "../utils/format-price/formatPrice";

const Cart = ({ cartItems, removeFromCart }) => {
  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <section className="container mx-auto p-4 h-[100vh] py-10">
      <h2 className="text-4xl text-center font-bold mb-6 py-5">
        Tu Carrito de Compras
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {cartItems.map((item, index) => (
              <div
                key={index} // Usamos id y size para manejar productos iguales con tallas diferentes
                className="flex items-center justify-between bg-white p-4 mb-4 rounded-lg shadow-sm border-2 border-stone-100"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-grow ml-4">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">
                    Precio: {formatPriceCLP(item.price)}
                  </p>
                  <p className="text-gray-600">Cantidad: {item.quantity}</p>
                  <p className="text-gray-600">Tamaño: {item.size}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.id, item.size)} // Eliminamos basado en id y size
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400"
                >
                  Eliminar
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
            <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-stone-500">
              Proceder al Pago
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
