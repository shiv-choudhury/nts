import React from "react";
import SideModal from "./layouts/SideModal";
import Icon from "./Icon";
import Counter from "./Counter";
import { useNavigate } from "react-router-dom";

export default function MiniCart(props) {
  const navigate = useNavigate();
  const { isOpen, setIsOpen } = props;

  return (
    <SideModal
      title="Mini Cart"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentStyle="p-0 flex flex-col h-full"
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-auto p-2">
          {Array(14)
            .fill(0)
            .map((_, index) => (
              <MiniCartCard key={index} />
            ))}
        </div>

        {/* Sticky Footer (Ensures It Stays at Bottom) */}
        <div className="p-4 bg-white shadow-lg border-t border-gray-200 sticky bottom-0">
          {/* Subtotal */}
          <div className="flex justify-between items-center text-lg font-semibold text-gray-900 mb-2">
            <span>Subtotal:</span>
            <span className="text-red-600">£1999</span>
          </div>

          {/* Shipping Info */}
          <p className="text-xs text-gray-500 mb-4">
            Shipping, taxes, and discounts codes calculated at checkout.
          </p>

          {/* Buttons - Stacked on small screens, side by side on large screens */}
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

const MiniCartCard = () => {
  return (
    <div className="p-2 mb-2 relative flex items-center bg-white rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-2xl">
      {/* Left Section (Title, Price & Counter) */}
      <div className="flex-1 pr-3">
        <div className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
          Very very very long very long very Product title
        </div>
        <div className="flex justify-between items-center text-sm text-gray-700">
          <div className="font-semibold">
            2 × <span className="text-red-700 font-bold">£1999</span>
          </div>
          <Counter quantity={1} setQuantity={() => {}} />
        </div>
      </div>

      {/* Product Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <img
          src="assets/product.jpg"
          alt="cart product"
          className="rounded-lg w-full h-full object-cover border border-gray-300"
        />
      </div>

      {/* Remove Button - Positioned Properly */}
      <button
        title="Remove"
        className="absolute top-0 right-0 text-xs bg-white text-gray-800 rounded-lg w-6 h-6 flex items-center justify-center font-bold hover:bg-gray-50 hover:text-white transition-all"
      >
        <Icon icon="times" className="text-xs text-red-600" />
      </button>
    </div>
  );
};
