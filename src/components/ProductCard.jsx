import { useState } from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import Icon from "./Icon";
import ProductDetailQuickview from "../pages/ProductDetailQuickview";
import CompareModal from "./CompareModal";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const { data } = props;

  const [slug, setSlug] = useState(false);
  const [openQuickview, setOpenQuickview] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);

  const imageBaseUrl = "https://naturaltilestone.co.uk/public/upload/product/";

  return (
    <div
      key={data?.id}
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden relative group"
    >
      <div id="popup">
        {openQuickview && (
          <ProductDetailQuickview
            isOpen={openQuickview}
            onClose={() => setOpenQuickview(false)}
            slug={slug}
          />
        )}
        {openCompare && (
          <CompareModal
            isOpen={openCompare}
            onClose={() => setOpenCompare(false)}
          />
        )}
      </div>
      {/* Product Image */}
      <div className="relative h-40 md:h-48">
        <img
          src={`${imageBaseUrl}${data?.images[0]}`}
          onError={(e) => {
            e.target.src = `assets/product.jpg`;
          }}
          onClick={() => {
            navigate(`/product/details/${data?.slug}`);
          }}
          alt="Product"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          SALE
        </span>

        {/* Icons Overlay (Hidden by default, visible on hover) */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
          {/* <button
            title="Add to Cart"
            className="bg-white p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center"
          >
            <Icon icon="shopping-bag" className="text-lg" />
          </button> */}
          <button
            title="Add to Wishlist"
            className="bg-white p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center"
          >
            <Icon icon="heart" className="text-lg" />
          </button>
          <button
            onClick={() => {
              setOpenQuickview(true);
              setSlug(data?.slug);
            }}
            title="Quickview"
            className="bg-white p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center"
          >
            <Icon icon="search" className="text-lg" />
          </button>
          <button
            onClick={() => setOpenCompare(true)}
            title="Add to Compare"
            className="bg-white p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center"
          >
            <ApartmentOutlined className="text-lg" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-3 md:p-4">
        <h3 className="font-medium text-sm md:text-base mb-1">{data?.name}</h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 line-through text-xs md:text-sm">
              £{data?.price?.price}
            </span>
            <span className="text-red-500 font-bold ml-2">
              £{data?.price?.ourPrice}
            </span>{" "}
            <span> per m</span>
            <sup>2</sup>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            Size:{" "}
            <span className="font-bold">{data?.tilesPerfection?.sizeMM}</span>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm pt-2 pb-1 px-2 rounded">
            <Icon icon="shopping-cart" className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
