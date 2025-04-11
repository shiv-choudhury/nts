import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProducts } from "../apis/ApiCalls";
import Icon from "../components/Icon";
import ProductLoader from "../components/Loaders";
import ProductCard from "../components/ProductCard";
import Filter from "../components/layouts/Filter";
import { imageBaseUrl4 } from "../components/utils/constants";

export default function ProductsPage() {
  const { category } = useParams();

  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const bannerImage = products?.details?.category_image?.[0] || "";

  useEffect(() => {
    setProducts([]);
    fetchCategoryProducts();
  }, [category]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const resp = await getProducts(category);
      const { status, success, message, data } = resp.data;

      if (success) {
        setProducts(data);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ProductLoader />;
  }

  const onFilterApply = (data) => {
    console.log("filters", data);
  };

  return (
    <div className="mb-8 md:mb-12">
      <Filter
        onFilterApply={onFilterApply}
        isOpen={openFilter}
        setIsOpen={setOpenFilter}
        data={products}
      />
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
          {products?.details?.name || "Products"}
        </h2>
        <button
          className="bg-blue-800 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 transition duration-300"
          onClick={() => setOpenFilter(true)}
        >
          <Icon icon="filter" className="mr-2" />
          Filter
        </button>
      </div>
      {bannerImage && (
        <img
          src={`${imageBaseUrl4}${bannerImage}`}
          alt="Category"
          className="w-full h-full object-cover rounded-lg shadow-md mb-6"
          onError={(e) => (e.target.src = `/assets/product.jpg`)}
        />
      )}

      {products?.products?.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium py-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products?.products.map((item) => (
            <ProductCard key={item._id || item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
