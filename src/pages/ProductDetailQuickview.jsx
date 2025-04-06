import React, { useEffect, useState } from "react";
import { ApartmentOutlined } from "@ant-design/icons";
import parse from "html-react-parser";
import Zoom from "react-medium-image-zoom";

import { getProductDetails } from "../apis/ApiCalls";
import { OrderDetailLoader } from "../components/Loaders";
import Modal from "../components/Modal";
import { imageBaseUrl1 } from "../components/utils/constants";
import Icon from "../components/Icon";
import ProductCard from "../components/ProductCard";

export default function ProductDetailQuickview(props) {
  const { isOpen, onClose, slug } = props;
  const imageBaseUrl = imageBaseUrl1;

  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const keyFeatures = productDetails?.metaDescription?.metaDescription
    ? parse(productDetails?.metaDescription?.metaDescription)
    : null;

  useEffect(() => {
    fetchProductDetails();
  }, [slug]);

  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const resp = await getProductDetails(slug);
      const { data, status, success, message } = resp.data;
      if (success) {
        setProductDetails(data);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const productData = {
    keyFeatures: [
      "Authentic Marble effect tile replicates real marble",
      "polished finish",
      "60X60mm in Size",
      "White with grey grains in Colour",
      "Can be laid in Herringbone or straight pattern",
      "Suitable on Walls and Floors",
      "Durable: Hard dense finish that can last a lifetime",
      "Hygiene: Easy to clean; makes it perfect for use in bathrooms and kitchens"
    ],
    moreFeatures: [
      "Density: Porcelain high density form mean that it is less likely to absorb water, crack in cold conditions and in some variations, it is able to withstand freezing temperature",
      "Suitability: Bathroom, Conservatory, Hall, Kitchen, Lounge, Patio, Back Garden.",
      "Incredibly realistic reproduction of natural grain",
      "Easy clean/low maintenance",
      "Suitable with underfloor heating"
    ],
    specifications: [
      {
        name: "Finish (Appearance)",
        value: productDetails?.tilesPerfection?.appearance
      },
      { name: "Material", value: productDetails?.tilesPerfection?.material },
      { name: "Glaze", value: productDetails?.tilesPerfection?.glaze },
      { name: "Rectified", value: productDetails?.tilesPerfection?.rectified },
      {
        name: "Thickness (mm)",
        value: productDetails?.tilesPerfection?.thickness
      },
      { name: "Type", value: productDetails?.tilesPerfection?.type },
      { name: "Size (mm)", value: productDetails?.tilesPerfection?.sizeMM },
      {
        name: "Wastage(%)",
        value: productDetails?.tilesPerfection?.wastage + "%"
      },
      { name: "Print", value: productDetails?.tilesPerfection?.print },
      { name: "Usage", value: productDetails?.tilesPerfection?.usage },
      {
        name: "Recommended Room",
        value: productDetails?.tilesPerfection?.recommendedRoom
      }
    ]
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    setCurrentImage(currentImage + 1);
  };

  const prevImage = () => {
    setCurrentImage(currentImage - 1);
  };

  const inStock = Number(productDetails?.stock) > 0;

  return (
    <Modal
      title="Product Detail Quickview"
      showHeader={true}
      isOpen={isOpen}
      onClose={onClose}
      closeOnOutsideClick={true}
    >
      <div className="">
        {loading ? (
          <div className="p-4">
            <OrderDetailLoader />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <div className="md:flex p-0 md:p-2">
              {/* Left side - Image */}
              <div className="md:w-4/10 p-2 relative">
                <div className="bg-white p-4 rounded-md shadow-sm mb-4 relative">
                  {productDetails?.images &&
                    productDetails.images.length > 0 && (
                      <Zoom>
                        <img
                          src={`${imageBaseUrl}${productDetails?.images[currentImage]}`}
                          alt={productDetails?.name}
                          className="w-full h-auto object-cover aspect-square"
                        />
                      </Zoom>
                    )}
                  <button
                    onClick={prevImage}
                    disabled={currentImage === 0}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-blue-500 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Icon icon="chevron-left" className="" />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={
                      currentImage === productDetails?.images?.length - 1
                    }
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center text-blue-500 hover:bg-gray-100 cursor-pointer disabled:cursor-not-allowed"
                  >
                    <Icon icon="chevron-right" className="" />
                  </button>
                </div>
                <div className="flex space-x-2">
                  {productDetails?.images?.map((src, idx) => (
                    <div
                      key={idx}
                      className={`border-2 ${
                        currentImage === idx
                          ? "border-blue-500"
                          : "border-gray-200"
                      } cursor-pointer`}
                      onClick={() => setCurrentImage(idx)}
                    >
                      <img
                        src={`${imageBaseUrl}${src}`}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-16 h-16 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Right side - Product Info */}
              <div className="md:w-6/10 p-2">
                <div className="bg-white p-6 rounded-md shadow-sm">
                  <h1 className="text-xl font-medium text-gray-800 mb-4">
                    {productDetails.name}
                  </h1>

                  <div
                    className={`text-white inline-block px-2 py-1 text-xs font-semibold rounded mb-4 ${
                      inStock ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {inStock ? "IN STOCK" : "Out Of Stock"}
                  </div>

                  <div className="mb-4">
                    <span className="text-gray-500 line-through mr-2">
                      £{productDetails?.price?.price}
                    </span>
                    <span className="text-red-500 text-2xl font-medium">
                      £{productDetails?.price?.ourPrice}
                    </span>
                    <span className="text-gray-600 text-sm ml-2">
                      {/* per m<sup>2</sup> */}
                      {productDetails?.unit}
                    </span>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex">
                      <span className="w-28 text-gray-600">Brand:</span>
                      <span className="text-gray-800">
                        {productDetails?.brand}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-gray-600">Size:</span>
                      <span className="text-gray-800">
                        {productDetails?.tilesPerfection?.sizeMM}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-gray-600">Product Code:</span>
                      <span className="text-gray-800">
                        {productDetails?.sku}
                      </span>
                    </div>
                    <div className="flex">
                      <span className="w-28 text-gray-600">Availability:</span>
                      <span className="text-gray-800">
                        {productDetails?.stock} SqM
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <span className="mr-4 text-gray-600">SqM(QTY)</span>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={decrementQuantity}
                        className="px-3 py-1 border-r hover:bg-gray-100 rounded cursor-pointer"
                      >
                        −
                      </button>
                      <input
                        type="text"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(parseInt(e.target.value) || 1)
                        }
                        className="w-12 text-center py-1"
                      />
                      <button
                        onClick={incrementQuantity}
                        className="px-3 py-1 border-l hover:bg-gray-100 rounded cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded flex items-center cursor-pointer">
                      <Icon icon="shopping-cart" className="mr-2" />
                      ADD TO CART
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 px-2 py-2 rounded cursor-pointer">
                      <Icon icon="heart" className="" />
                    </button>
                    <button className="border border-gray-300 hover:bg-gray-100 px-2 py-2 rounded cursor-pointer">
                      <ApartmentOutlined className="text-lg" />
                    </button>
                  </div>

                  <button className="w-full bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded mb-4 cursor-pointer">
                    ORDER FULL TILE SAMPLE (£
                    {productDetails?.price?.ourFullCutPrice})
                  </button>

                  <div className="text-sm text-gray-600 mb-2">
                    All our prices include VAT.
                  </div>
                  <div className="text-sm text-red-500 mb-1">
                    Delivery Charges: £40 Flat Rate (FREE over order of £499)
                  </div>
                  <div className="text-sm text-red-500 mb-4">
                    Sample Delivery: Free
                  </div>

                  <div className="bg-gray-50 p-4 rounded text-center">
                    <p className="font-medium text-gray-700">
                      Need Help? Call Our Experts On
                    </p>
                    <p className="font-bold text-gray-900">024 7637 5531</p>
                  </div>
                </div>
              </div>
            </div>

            {productDetails?.description && (
              <div className="p-4">
                <h2 className="text-2xl font-medium text-center text-gray-800 mb-6">
                  Description
                </h2>
                <div
                  className="text-center text-gray-600"
                  dangerouslySetInnerHTML={{
                    __html: productDetails?.description
                  }}
                ></div>
              </div>
            )}

            {/* Key Features */}
            <div className="p-4">
              <h2 className="text-2xl font-medium text-center text-gray-800 mb-6">
                Key Features
              </h2>

              <div className="flex">
                <div className="lg:p-4">
                  <ul className="space-y-3">
                    {keyFeatures?.map((feature, index) => (
                      <li key={index} className="flex items-start ">
                        <Icon
                          icon="check"
                          className="mt-1 mr-2 text-green-500"
                        />

                        <span>{feature?.props?.children}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="p-4">
              <h2 className="text-2xl font-medium text-center text-gray-800 mb-6">
                Specification
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {productData?.specifications.map((spec, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="p-4 border border-gray-200 font-medium">
                          {spec.name}
                        </td>
                        <td className="p-4 border border-gray-200">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* related products */}
            <div className="mx-4 mb-8 md:mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
                  Related Products
                </h2>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {productDetails?.relatedproduct?.map((item) => (
                  <ProductCard data={item} />
                ))}
              </div>
            </div>

            {/* required products */}
            <div className="mx-4 mb-8 md:mb-12">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
                  Required Products
                </h2>
              </div>
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {productDetails?.requiredproduct?.map((item) => (
                  <ProductCard data={item} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
