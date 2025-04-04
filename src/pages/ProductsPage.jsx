import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../apis/ApiCalls";
import ProductCard from "../components/ProductCard";
import ProductLoader from "../components/Loaders";

export default function ProductsPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProducts([]);
    fetchCategoryProducts();
  }, [category]);

  const fetchCategoryProducts = async () => {
    try {
      setLoading(true);
      const resp = await getProducts(category);
      const { status, message, data } = resp.data;

      if (status) {
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

  return (
    <div className="mb-8 md:mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
          Category Products
        </h2>
      </div>

      {loading ? (
        <ProductLoader />
      ) : products.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium py-12">
          No products found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {products.map((item) => (
            <ProductCard key={item._id || item.id} data={item} />
          ))}
        </div>
      )}
    </div>
  );
}
