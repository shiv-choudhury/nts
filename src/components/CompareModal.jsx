import React, { useState } from "react";
import HalfModal from "./HalfModal";
import { useNavigate } from "react-router-dom";

export default function CompareModal(props) {
  const { isOpen, onClose } = props;
  return (
    <HalfModal
      isOpen={isOpen}
      onClose={onClose}
      title="Compare"
      showFooter={false}
      modalStyle="!h-4/6 md:!h-3/6"
    >
      <ProductComparisonModal />
    </HalfModal>
  );
}

const ProductComparisonModal = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Black Marble Tile",
      image: "assets/product.jpg",
      selected: true
    },
    {
      id: 2,
      name: "Black Marble Tile",
      image: "assets/product2.jpg",
      selected: true
    }
  ]);

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleClearAll = () => {
    setProducts([]);
  };

  return (
    <div className="w-full bg-white p-4 shadow-lg rounded-t-lg border-t border-gray-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">COMPARE PRODUCTS</h2>
        <p className="text-sm text-gray-500">({products.length} Products)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 overflow-x-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 pb-2">
            {products.map((product) => (
              <div key={product.id} className="relative overflow-visible">
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md z-10 flex items-center justify-center w-5 h-5"
                >
                  <span className="text-gray-500 text-xs">✕</span>
                </button>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-28 object-cover border border-gray-200 rounded-md"
                />
              </div>
            ))}

            {[...Array(4 - products.length)].map((_, index) => (
              <div
                key={`empty-${index}`}
                className="border border-dashed border-gray-300 rounded-md h-28 flex items-center justify-center bg-gray-50"
              >
                <button className="text-3xl text-gray-300">+</button>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 justify-end">
          <button
            className="bg-red-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={handleClearAll}
          >
            Clear All
          </button>

          <button
            onClick={() => navigate("/compare")}
            className="bg-gray-800 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 cursor-pointer"
          >
            START COMPARE !
          </button>
        </div>
      </div>
    </div>
  );
};
