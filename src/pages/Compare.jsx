import React, { useState } from "react";

const initialProducts = [
  {
    image: "assets/product.jpg",
    name: "Estrella Light Grey High Gloss Porcelain Wall and Floor Tile 300X600mm",
    price: { original: 49.99, discounted: 34.99 },
    availability: "In stock",
    finish: "Gloss, High Gloss",
    material: "Porcelain",
    color: "Grey",
    size: "300x600mm"
  },
  {
    image: "assets/product.jpg",
    name: "Rustic Mix Split Face Slate 100x360mm Wall Cladding Tile",
    price: { original: 79.99, discounted: 59.99 },
    availability: "In stock",
    finish: "Natural Stone, Natural Riven",
    material: "Natural Stone",
    color: "Multi",
    size: "100x360mm"
  },
  {
    image: "assets/product.jpg",
    name: "Oyster Beige Split Face Slate 100x360mm Wall Cladding Tile",
    price: { original: 79.99, discounted: 59.99 },
    availability: "In stock",
    finish: "Natural Stone, Natural Riven",
    material: "Natural Stone",
    color: "Beige, Ivory, Cream",
    size: "100x360mm"
  },
  {
    image: "assets/product.jpg",
    name: "Classic White Marble Tile 600x600mm",
    price: { original: 89.99, discounted: 69.99 },
    availability: "In stock",
    finish: "Polished, High Gloss",
    material: "Marble",
    color: "White",
    size: "600x600mm"
  }
];

const ComparisonTable = () => {
  const [products, setProducts] = useState(initialProducts);

  const removeProduct = (index) => {
    setProducts((prevProducts) => prevProducts.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto p-4 overflow-x-auto">
      {products.length === 0 ? (
        <p className="text-center text-gray-700 font-semibold">
          You don't have any items in your compare list
        </p>
      ) : (
        <table className="w-full text-center bg-white shadow-xl rounded-md table-fixed">
          <thead>
            <tr className="bg-white text-gray-700 text-sm md:text-base">
              <th className="p-2 w-32 rounded-tl-md">Product</th>
              {products.map((product, index) => (
                <th key={index} className="p-2 w-48 relative align-top">
                  <div className="relative w-full">
                    <button
                      onClick={() => removeProduct(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full hover:bg-red-600"
                    >
                      ✕
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mx-auto w-44 h-44 object-cover rounded-md"
                    />
                    <p className="mt-2 text-sm md:text-base font-semibold text-gray-800">
                      {product.name}
                    </p>
                  </div>
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
                          £{product.price.original}
                        </span>{" "}
                        £{product.price.discounted} Per M2
                      </span>
                    ) : label === "Availability" ? (
                      <span className="text-green-600">
                        {product.availability}
                      </span>
                    ) : (
                      product[label.toLowerCase().replace(/ \(.*?\)/, "")]
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
