import { useState } from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import Icon from "./Icon";
import ProductDetailQuickview from "../pages/ProductDetailQuickview";
import CompareModal from "./CompareModal";
import { addToCart, addToCompare, addToFavorites } from "../apis/ApiCalls";
import { imageBaseUrl1 } from "./utils/constants";
import useAppContext from "./context/UserContext";

export default function ProductCard(props) {
  const navigate = useNavigate();
  const { data, showProductActions = true } = props;
  const { userState, dispatch } = useAppContext();

  const imageBaseUrl = imageBaseUrl1;

  const [slug, setSlug] = useState(false);
  const [openQuickview, setOpenQuickview] = useState(false);
  const [openCompare, setOpenCompare] = useState(false);
  const [loading, setLoading] = useState(false);
  const [compareLoader, setCompareLoader] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompare, setIsCompare] = useState(false);

  const addToWishlist = async () => {
    try {
      setLoading(true);
      const resp = await addToFavorites({ productId: data?._id });
      const { success, message, fav } = resp.data;

      setIsFavorite(message === "Product added to favorites.");

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCompare = async () => {
    // if (userState?.compareLength >= 4) {
    //   toast.error("You can compare only 4 products at a time.");
    //   return;
    // }

    try {
      setCompareLoader(true);
      const resp = await addToCompare({ productId: data?._id });
      const { compare, success, message } = resp.data;
      console.log("compare", compare);

      setIsCompare(message === "Product added to compare product.");
      if (success) {
        dispatch({
          type: "COMPARE_LENGTH",
          data: compare?.length
        });
        dispatch({
          type: "COMPARE_DATA",
          data: compare || []
        });
        setOpenCompare(true);
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCompareLoader(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      setCartLoader(true);
      const payload = {
        productId: data?._id,
        quantity: 1,
        price: data?.price?.ourPrice
      };
      const resp = await addToCart(payload);
      const { data: productData, success, message, status } = resp.data;
      if (success) {
        toast.success(message);
        dispatch({
          type: "CART_LENGTH",
          data: productData?.products?.length
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setCartLoader(false);
    }
  };

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
            if (
              e.target.src !== `${window.location.origin}/assets/product.jpg`
            ) {
              e.target.src = `${window.location.origin}/assets/product.jpg`;
            }
          }}
          onClick={() => {
            navigate(`/product/details/${data?.slug}`);
          }}
          alt="Product"
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
        {data?.productLabel && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            {data?.productLabel}
          </span>
        )}

        {/* Icons Overlay (Hidden by default, visible on hover) */}
        {showProductActions && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
            {/* <button
            title="Add to Cart"
            className="bg-white p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center"
          >
            <Icon icon="shopping-bag" className="text-lg" />
          </button> */}
            <button
              onClick={addToWishlist}
              title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              className={`p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center ${
                isFavorite ? "bg-red-500" : "bg-white"
              }`}
            >
              {loading ? (
                <Icon icon="spinner" className="text-lg animate-spin" />
              ) : (
                <Icon
                  icon="heart"
                  className={`text-lg ${isFavorite ? "text-white" : ""}`}
                />
              )}
            </button>
            <button
              onClick={handleAddToCompare}
              title={isCompare ? "Remove from Compare" : "Add to Compare"}
              className={` p-2 rounded-full shadow hover:cursor-pointer flex items-center justify-center ${
                isCompare ? "bg-red-500" : "bg-white"
              }`}
            >
              {compareLoader ? (
                <Icon icon="spinner" className="text-lg animate-spin" />
              ) : (
                <ApartmentOutlined
                  className="text-lg"
                  style={{ color: isCompare ? "white" : "inherit" }}
                />
              )}
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
          </div>
        )}
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
            <span>{data?.unit}</span>
            {/* <sup>2</sup> */}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            Size:{" "}
            <span className="font-bold">{data?.tilesPerfection?.sizeMM}</span>
          </div>
          <button
            title="Add to Cart"
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm pt-2 pb-1 px-2 rounded"
          >
            {cartLoader ? (
              <Icon icon="spinner" className="text-lg animate-spin" />
            ) : (
              <Icon icon="shopping-cart" className="text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
