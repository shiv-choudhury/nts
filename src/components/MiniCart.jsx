import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import SideModal from "./layouts/SideModal";
import Icon from "./Icon";
import Counter from "./Counter";
import { getCartList, removeFromCart, updateCart } from "../apis/ApiCalls";
import { imageBaseUrl1 } from "./utils/constants";
import useAppContext from "./context/UserContext";

export default function MiniCart({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { userState, dispatch } = useAppContext();

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetchCartlist();
  }, []);

  const fetchCartlist = async () => {
    try {
      const resp = await getCartList();
      const { data, status, message } = resp.data;

      if (status) {
        setCartData(data);
        dispatch({
          type: "CART_LENGTH",
          data: data?.products?.length
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SideModal
      title="Mini Cart"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentStyle="p-0 flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-2">
          {cartData?.products?.length > 0 ? (
            cartData.products.map((data, index) => (
              <MiniCartCard
                key={index}
                data={data}
                fetchCartlist={fetchCartlist}
              />
            ))
          ) : (
            <div className="flex flex-col justify-center items-center h-full">
              <p className="text-md text-gray-600">Your cart is empty</p>
              <p className="text-sm text-gray-600">
                Add products to see them here
              </p>
            </div>
          )}
        </div>

        <div className="p-4 bg-white shadow-lg border-t border-gray-200 sticky bottom-0">
          <div className="flex justify-between items-center text-lg font-semibold text-gray-900 mb-2">
            <span>Subtotal:</span>
            <span className="text-red-600">
              £{cartData?.totalPrice?.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Shipping, taxes, and discounts calculated at checkout.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                navigate("/cart");
                setIsOpen(false);
              }}
              className="bg-gray-900 text-white py-3 rounded-lg font-medium text-sm hover:bg-gray-700 transition"
            >
              View Cart
            </button>
            <button
              onClick={() => {
                navigate("/checkout");
                setIsOpen(false);
              }}
              className="bg-red-600 text-white py-3 rounded-lg font-medium text-sm hover:bg-red-700 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </SideModal>
  );
}

const MiniCartCard = ({ data, fetchCartlist }) => {
  const [quantity, setQuantity] = useState(data?.quantity);
  const [loading, setLoading] = useState(false);

  const updateCartList = async () => {
    try {
      setLoading(true);
      const payload = { productId: data?.product?._id, quantity };
      const resp = await updateCart(payload);
      const { status, message } = resp.data;
      if (status) {
        toast.success(message);
        fetchCartlist();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const removeProductFromCart = async () => {
    try {
      setLoading(true);
      const payload = { productId: data?.product?._id };
      const resp = await removeFromCart(payload);
      const { status, message } = resp.data;
      if (status) {
        toast.success(message);
        fetchCartlist();
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (quantity !== data?.quantity) {
      updateCartList();
    }
  }, [quantity]);

  return (
    <div className="p-2 mb-2 relative flex items-center bg-white rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-2xl">
      {/* Left Section (Title, Price & Counter) */}
      <div className="flex-1 pr-3">
        <div className="text-sm font-medium text-gray-900 mb-2">
          {data?.product?.name}
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="font-semibold">
            {data?.quantity} x{" "}
            <span className="text-red-700 font-bold">£{data?.price}</span>
          </div>
          <Counter
            disabled={loading}
            quantity={data?.quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src={`${imageBaseUrl1}${data?.product?.images[0]}`}
          onError={(e) => (e.target.src = `assets/product.jpg`)}
          alt="cart product"
          className="rounded-lg w-full h-full object-cover border border-gray-300"
        />
      </div>
      <button
        disabled={loading}
        onClick={removeProductFromCart}
        className="absolute top-0 right-0 text-xs bg-white text-gray-800 rounded-lg w-6 h-6 flex items-center justify-center font-bold disabled:cursor-not-allowed hover:bg-gray-50 hover:text-white transition-all"
      >
        <Icon icon="times" className="text-xs text-red-600" />
      </button>
    </div>
  );
};
