import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Icon from "../components/Icon";
import {
  getCartList,
  removeFromCart,
  updateCart,
  clearCart
} from "../apis/ApiCalls";
import useAppContext from "../components/context/UserContext";
import { imageBaseUrl1 } from "../components/utils/constants";

const Cart = () => {
  const navigate = useNavigate();
  const { dispatch } = useAppContext();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const resp = await getCartList();
      const { data, status, message } = resp.data;

      if (status) {
        setCartItems(data.products);
        dispatch({ type: "CART_LENGTH", data: data?.products?.length });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch cart data");
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const payload = { productId: id, quantity: newQuantity };
      const resp = await updateCart(payload);
      if (resp.data.status) {
        fetchCartData();
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating cart item");
    }
  };

  const removeItem = async (id) => {
    try {
      const payload = { productId: id };
      const resp = await removeFromCart(payload);
      if (resp.data.status) {
        fetchCartData();
        toast.success("Item removed");
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing item");
    }
  };

  const handleClearCart = async () => {
    try {
      const resp = await clearCart();
      if (resp.data.status) {
        setCartItems([]);
        dispatch({ type: "CART_LENGTH", data: 0 });
        toast.success(resp.data.message);
      } else {
        toast.error(resp.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error clearing cart");
    }
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

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-3 sm:p-4">
          {cartItems.length > 0 ? (
            <div className="overflow-x-auto">
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
                    <tr
                      key={item.product._id}
                      className="border-b border-gray-200"
                    >
                      <td className="p-3 flex items-center space-x-3">
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="px-1 text-red-500 hover:text-red-700 transition cursor-pointer hover:bg-red-200 rounded-xl"
                        >
                          ✕
                        </button>
                        <img
                          src={`${imageBaseUrl1}${item?.product?.images[0]}`}
                          onError={(e) => (e.target.src = `assets/product.jpg`)}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold">{item.product.name}</p>
                        </div>
                      </td>
                      <td className="p-3 text-gray-700">
                        £{item.price.toFixed(2)}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center border rounded w-fit">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity - 1
                              )
                            }
                            className="px-3 py-1 border-r hover:bg-gray-100 transition"
                          >
                            −
                          </button>
                          <span className="px-4">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product._id,
                                item.quantity + 1
                              )
                            }
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
          ) : (
            <div className="text-center text-lg text-gray-600 h-32 flex justify-center items-center">
              Your cart is empty
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:justify-between mt-4 sm:mt-6 gap-3">
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition text-sm sm:text-base"
            >
              Continue Shopping
            </button>
            <button
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition text-sm sm:text-base"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 h-fit sm:sticky sm:top-20">
          <h3 className="text-base sm:text-lg font-bold border-b pb-2">
            Order Summary
          </h3>
          <div className="flex justify-between text-gray-700 my-3">
            <span>Subtotal:</span>
            <span className="font-semibold">£{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-red-500 my-3">
            <span>Total:</span>
            <span className="font-semibold">£{subtotal.toFixed(2)}</span>
          </div>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Shipping, taxes, and discounts calculated at checkout.
          </p>
          <button className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center">
            Proceed to Checkout
            <Icon icon="arrow-right" className="ml-2 text-md" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
