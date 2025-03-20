import React, { useState } from "react";
import SideModal from "./layouts/SideModal";
import Icon from "./Icon";
import Counter from "./Counter";

export default function MiniCart(props) {
  const { isOpen, setIsOpen } = props;
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <SideModal
      title="Mini Cart"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      contentStyle="!p-0 flex h-screen"
    >
      <div className="p-2 flex flex-col justify-between h-full">
        <div className="overflow-y-auto">
          {Array(14)
            .fill(0)
            .map((item, index) => (
              <MiniCartCard key={index} />
            ))}
        </div>
        <div>Footer content</div>
      </div>
    </SideModal>
  );
}

const MiniCartCard = () => {
  return (
    <div className="p-2 mb-2 relative flex justify-between items-center bg-white rounded-lg shadow-lg border border-gray-200 transition-all hover:shadow-2xl">
      {/* Left Section (Title, Price & Counter) */}
      <div className="mr-3 flex-1">
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

      {/* Remove Button */}
      <button
        title="Remove"
        className="absolute -top-2 -right-2 text-xs bg-white text-gray-800 rounded-full w-6 h-6 flex items-center justify-center font-bold hover:bg-gray-50 hover:text-white transition-all"
      >
        <Icon icon="times" className="text-xs text-red-600" />
      </button>
    </div>
  );
};
