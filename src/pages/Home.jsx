import React, { useEffect } from "react";
import { toast } from "react-toastify";

import { getAboutUsData, getCategories } from "../apis/ApiCalls";
import ProductCard from "../components/ProductCard";
import ImageCarousel from "../components/ImageCarousel";
import CookieConsentBanner from "../components/CookieConsentBanner";
import { Link } from "react-router-dom";

export default function Home(props) {
  const { children, className } = props;

  useEffect(() => {
    // fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categories = await getCategories();
      const about = await getAboutUsData();
      toast.success(" this is toast success");
      console.log(categories.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <main className="bg-gray-50">
        <CookieConsentBanner />
        <div className="container mx-auto">
          <ImageCarousel
            carouselItems={[
              "assets/banner1.png",
              "assets/banner2.jpg",
              "assets/banner1.png",
              "assets/banner2.jpg"
            ]}
          />
        </div>

        {/* Hero/Banner section */}
        <div className="w-full bg-gray-200 py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                Natural Stone & Tiles
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
                Quality tiles for your home and business. Discover our extensive
                range of natural stone, porcelain, and ceramic tiles.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Category navigation */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              Shop By Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                "Wall Tiles",
                "Floor Tiles",
                "Bathroom Tiles",
                "Outdoor Tiles"
              ].map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 text-center cursor-pointer"
                >
                  <div className="bg-gray-200 h-32 md:h-40 mb-3 rounded flex items-center justify-center">
                    <span className="text-gray-400">Image</span>
                  </div>
                  <h3 className="font-medium">{category}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Featured products */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                Featured Products
              </h2>
              <Link to="#" className="text-blue-600 hover:text-blue-800">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <ProductCard key={item} />
              ))}
            </div>
          </div>

          {/* Custom content area */}
          <div className={`bg-white rounded-lg shadow p-4 md:p-6 ${className}`}>
            {children || (
              <div className="space-y-4">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                  Welcome to The Natural Stone and Tiles Co.
                </h2>
                <p>
                  We are a leading supplier of high-quality natural stone,
                  porcelain, and ceramic tiles for both residential and
                  commercial projects. With over 20 years of experience in the
                  industry, we pride ourselves on offering exceptional products
                  at competitive prices.
                </p>
                <p>
                  Our showroom in Nuneaton features a wide range of wall tiles,
                  floor tiles, bathroom tiles, and outdoor options. Whether
                  you're renovating your home or working on a large commercial
                  project, our expert team is here to help you find the perfect
                  tiles for your needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                  <div className="bg-gray-50 p-4 rounded text-center">
                    <h3 className="font-medium mb-2">
                      Free Design Consultation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Book an appointment with our design experts for
                      personalized advice.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded text-center">
                    <h3 className="font-medium mb-2">Sample Service</h3>
                    <p className="text-sm text-gray-600">
                      Order tile samples to see how they look in your space
                      before purchasing.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded text-center">
                    <h3 className="font-medium mb-2">
                      Professional Installation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Connect with our network of trusted installation
                      professionals.
                    </p>
                  </div>
                </div>
                <p>
                  Visit our showroom today or browse our online collection to
                  discover the perfect tiles for your project.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
