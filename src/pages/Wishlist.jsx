import React, { useEffect, useState } from "react";
import { getFavoritesList } from "../apis/ApiCalls";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const resp = await getFavoritesList();
      const { data, success, message } = resp.data;

      if (success) {
        setWishlist(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
          Wishlist
        </h2>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {wishlist?.map((item) => (
          <ProductCard data={item} showProductActions={true} />
        ))}
      </div>
      {wishlist?.length === 0 && (
        <div className="text-center text-xl h-60 flex items-center justify-center text-gray-500 mt-4">
          No products in wishlist.
        </div>
      )}
    </div>
  );
}
