import React, { useState } from "react";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Oyster Beige Split Face Slate",
      description: "100x360mm Wall Cladding Tile",
      price: 59.99,
      quantity: 1,
      image: "assets/product.jpg"
    },
    {
      id: 2,
      name: "Rustic Mix Split Face Slate",
      description: "100x360mm Wall Cladding Tile",
      price: 59.99,
      quantity: 1,
      image: "assets/product.jpg"
    }
  ]);

  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Shopping Cart
      </h2>

      {/* Cart Layout */}
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        {/* Cart Items */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-3 sm:p-4">
          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-3">Items</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-3 flex items-center space-x-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        ✕<span className="sr-only">Remove</span>
                      </button>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {item.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-3 text-gray-700">
                      £{item.price.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center border rounded w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-3 py-1 border-r hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-3 py-1 border-l hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 font-semibold">
                      £{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="sm:hidden space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-gray-200 pb-4 relative"
              >
                <div className="flex items-start">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded mr-3"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition ml-2"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      {item.description}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">
                      £{item.price.toFixed(2)}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center border rounded w-fit">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 border-r hover:bg-gray-100 transition"
                        >
                          −
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 border-l hover:bg-gray-100 transition"
                        >
                          +
                        </button>
                      </div>
                      <p className="font-semibold text-sm">
                        £{(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 sm:mt-6 gap-3">
            <button className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base">
              Continue Shopping
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base"
              onClick={() => setCartItems([])}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 h-fit sm:sticky sm:top-20">
          <h3 className="text-base sm:text-lg font-bold border-b pb-2">
            Order Summary
          </h3>
          <div className="flex justify-between text-gray-700 my-3">
            <span>Subtotal:</span>
            <span className="font-semibold">£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-700 my-3">
            <span>Total:</span>
            <span className="font-semibold">£{subtotal.toFixed(2)}</span>
          </div>
          <div className="text-xs sm:text-sm text-gray-500 mb-4">
            Shipping, taxes, and discounts calculated at checkout.
          </div>
          <button className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 transition">
            Proceed to Checkout →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
