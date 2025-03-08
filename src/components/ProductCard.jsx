import React from "react";

export default function ProductCard(props) {
  const { item } = props;
  return (
    <div
      key={item}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="bg-gray-100 h-40 md:h-48 relative">
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          SALE
        </span>
      </div>
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-sm md:text-base mb-1">
          Natural Stone Tile {item}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 line-through text-xs md:text-sm">
              £59.99
            </span>
            <span className="text-black font-bold ml-2">£49.99</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm py-1 px-2 rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
