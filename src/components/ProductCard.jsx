import { ApartmentOutlined } from "@ant-design/icons";
import Icon from "./Icon";

export default function ProductCard(props) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden relative group">
      {/* Product Image */}
      <div className="relative h-40 md:h-48">
        <img
          src="assets/product.jpg"
          alt="Product"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          SALE
        </span>

        {/* Icons Overlay (Hidden by default, visible on hover) */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow">
            <Icon icon="shopping-bag" className="text-lg" />
          </button>
          <button className="bg-white p-2 rounded-full shadow">
            <Icon icon="heart" className="text-lg" />
          </button>
          <button className="bg-white p-2 rounded-full shadow">
            <Icon icon="search" className="text-lg" />
          </button>
          <button className="bg-white p-2 rounded-full shadow">
            <ApartmentOutlined className="text-lg" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-sm md:text-base mb-1">
          Natural Stone Tile
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 line-through text-xs md:text-sm">
              £59.99
            </span>
            <span className="text-black font-bold ml-2">£49.99</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            Size:
            <span className="font-bold">100 x 360</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm pt-2 pb-1 px-2 rounded">
            <Icon icon="shopping-cart" className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
