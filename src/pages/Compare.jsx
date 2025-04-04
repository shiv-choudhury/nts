import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { addToCompare, getCompareList } from "../apis/ApiCalls";
import { imageBaseUrl1 } from "../components/utils/constants";

const ComparisonTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCompareProducts();
  }, []);

  const fetchCompareProducts = async () => {
    try {
      const resp = await getCompareList();
      const { success, message, compare } = resp.data;
      console.log("compare", compare);

      if (success) {
        setProducts(compare);
      } else {
        console.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveProduct = async (id) => {
    try {
      const payload = { productId: id };
      const resp = await addToCompare(payload);
      const { compare, success, message } = resp.data;
      if (success) {
        fetchCompareProducts();
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error removing item");
    }
  };

  const removeProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {products?.length === 0 ? (
        <p className="h-[20vh] text-center text-gray-700 font-semibold flex items-center justify-center">
          You don't have any items in your compare list
        </p>
      ) : (
        <table className="w-full text-center bg-white shadow-xl rounded-md table-fixed">
          <thead>
            <tr className="bg-white text-gray-700 text-sm md:text-base">
              <th className="p-2 w-32 bg-red-100 rounded-tl-md">Product</th>
              {products.map((item, index) => (
                <th key={index} className="p-2 w-48 bg-red-100">
                  <button
                    onClick={() => handleRemoveProduct(item?._id)}
                    className="bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </th>
              ))}
            </tr>
            <tr className="bg-white text-gray-700 text-sm md:text-base">
              <th className="p-2 w-32 rounded-tl-md">Image</th>
              {products.map((product, index) => (
                <th key={index} className="p-2 w-48 relative align-top">
                  <img
                    src={`${imageBaseUrl1}${product?.images[0]}`}
                    onError={(e) => {
                      e.target.src = `assets/product.jpg`;
                    }}
                    // src={product.image}
                    alt={product.name}
                    className="mx-auto w-44 h-44 object-cover rounded-md border border-gray-200"
                  />
                  <p className="mt-2 text-sm md:text-base font-semibold text-gray-800">
                    {product.name}
                  </p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              "Price",
              "Availability",
              "Finish (Appearance)",
              "Material",
              "Color",
              "Size (mm)"
            ].map((label, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? "bg-red-100" : "bg-white"}
              >
                <td className="p-2 font-bold text-xs md:text-sm w-32">
                  {label}
                </td>
                {products.map((product, index) => (
                  <td
                    key={index}
                    className="p-2 text-gray-700 text-sm md:text-base w-48"
                  >
                    {label === "Price" ? (
                      <span className="text-red-500 font-bold">
                        <span className="line-through text-gray-400">
                          £{product?.price?.price?.toFixed(2)}
                        </span>{" "}
                        £{product?.price?.ourPrice?.toFixed(2)} {product?.unit}
                      </span>
                    ) : label === "Availability" ? (
                      <span
                        className={
                          product?.stock > 0 ? "text-green-600" : "text-red-500"
                        }
                      >
                        {product?.stock > 0 ? "In stock" : "Out of stock"}
                      </span>
                    ) : label === "Finish (Appearance)" ? (
                      product?.tilesPerfection?.appearance || "-"
                    ) : label === "Material" ? (
                      product?.tilesPerfection?.material || "-"
                    ) : label === "Color" ? (
                      product?.tilesPerfection?.color || "-"
                    ) : label === "Size (mm)" ? (
                      product?.tilesPerfection?.sizeMM || "-"
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ComparisonTable;
