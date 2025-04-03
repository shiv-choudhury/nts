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
import Counter from "../components/Counter";
import { DeleteFilled, DeleteOutlined } from "@ant-design/icons";

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

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Shopping Cart
      </h2>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-3 sm:p-4">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              <tr className="hidden border-b border-gray-200 sm:flex justify-between items-center">
                <th className="p-3">Items</th>
                <th className="p-3">Subtotal</th>
              </tr>
              {cartItems.map((item) => (
                <div
                  key={item.product._id}
                  className="flex flex-col sm:flex-row items-center sm:items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                >
                  <div className="relative">
                    <img
                      src={`${imageBaseUrl1}${item?.product?.images[0]}`}
                      onError={(e) => (e.target.src = `assets/product.jpg`)}
                      alt={item.product.name}
                      className="w-full sm:w-20 h-auto sm:h-20 object-cover rounded border border-gray-200 sm:mr-4"
                    />
                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="absolute -top-2 -right-2 mr-0 sm:mr-2 px-1 bg-white rounded-2xl self-center sm:self-center font-bold text-red-500 hover:bg-red-100"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="flex flex-col w-full sm:flex-row sm:justify-between text-center sm:text-left">
                    <div className="flex-1">
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="mt-2  text-sm text-blue-800">
                        £{item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start mt-2 sm:mt-0">
                      <Counter
                        quantity={item.quantity}
                        setQuantity={(newQuantity) =>
                          updateQuantity(item.product._id, newQuantity)
                        }
                      />
                    </div>

                    <div className="font-semibold mt-2 sm:mt-0 sm:ml-4 sm:flex justify-between items-center">
                      £{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
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
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-green-700 flex items-center justify-center"
          >
            Proceed to Checkout
            <Icon icon="arrow-right" className="ml-2 text-md" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
