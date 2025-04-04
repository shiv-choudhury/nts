import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { getHomeData } from "../apis/ApiCalls";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import ImageCarousel from "../components/ImageCarousel";
import CookieConsentBanner from "../components/CookieConsentBanner";
import PromotionalBanner from "../components/PromotionalBanner";
import CountdownBanner from "../components/CountdownBanner";
import WelcomePopup from "../components/WelcomePopup";
import useAppContext from "../components/context/UserContext";

export default function Home(props) {
  const { children, className } = props;
  const { userState, dispatch } = useAppContext();

  const [homeData, setHomeData] = useState({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const resp = await getHomeData();
      const { data, status, message } = resp.data;
      if (status) {
        setHomeData(data);
        dispatch({
          type: "HOME_PAGE_DATA",
          data: data
        });
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <main className="bg-gray-50">
        <div id="popups">
          <WelcomePopup data={homeData?.popup} />
          <CookieConsentBanner />
        </div>
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
        <PromotionalBanner data={homeData?.aboutdelivery} />
        <CountdownBanner data={homeData?.offers} />

        {/* Hero/Banner section */}
        {false && (
          <div className="w-full bg-gray-200 py-12 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                  Natural Stone & Tiles
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8">
                  Quality tiles for your home and business. Discover our
                  extensive range of natural stone, porcelain, and ceramic
                  tiles.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition duration-300">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main content area */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Best sellers */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
                Best Sellers
              </h2>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {homeData?.bestseller?.map((item) => (
                <ProductCard data={item} />
              ))}
            </div>
          </div>

          {/* Best sellers */}
          <div className="mb-8 md:mb-12">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-800">
                Trending Products
              </h2>
            </div>

            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {homeData?.toproduct?.map((item) => (
                <ProductCard data={item} />
              ))}
            </div>
          </div>

          {/* Category navigation */}
          <div className="mb-8 md:mb-12">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-800">
              Shop By Category
            </h2>
            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map((item) => (
                <CategoryCard key={item} />
              ))}
            </div>
          </div>

          {/* bottom About section */}
          <div className="w-full bg-gray-200 py-12 md:py-24">
            <div className="container mx-auto px-4">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
                  Natural Stone & Tiles
                </h1>
                <p className="text-xs md:text-md text-gray-600 mb-8">
                  Welcome to The Natural Stone & Tiles Co. We specialize in
                  designing and importing premium quality Natural Stone, Quartz
                  & Porcelain floor & wall tiles. Our products are brought in
                  direct from source, this means that we can bring you the very
                  latest products at prices much lower than high street
                  retailers. Contact one of our experienced Tile Consultants
                  today, they are on-hand to answer all your product enquiries.
                  If you have an enquiry or know more please call us at{" "}
                  <a href="tel:02476375531" className="text-blue-600">
                    024-76375531
                  </a>
                  or email the team at{" "}
                  <a
                    href="mailto:info@naturaltilestone.co.uk"
                    className="text-blue-600"
                  >
                    info@naturaltilestone.co.uk
                  </a>
                </p>
                <p className="text-sm md:text-md">
                  WE ARE EXTREMELY COMPETITIVE ON PRICE; OUR POLICY IS TO BETTER
                  ANY LIKE FOR LIKE QUOTE.
                </p>
                <p className="text-sm md:text-md">
                  WE PROVIDE UK-WIDE DELIVERY.
                </p>
              </div>
            </div>
          </div>

          {/* Custom content area */}
          {false && (
            <div
              className={`bg-white rounded-lg shadow p-4 md:p-6 ${className}`}
            >
              {children || (
                <div className="space-y-4">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-800">
                    Welcome to The Natural Stone and Tiles Co.
                  </h2>
                  <p>
                    We are a leading supplier of high-quality natural stone,
                    porcelain, and ceramic tiles for both residential and
                    commercial projects. With over 20 years of experience in the
                    industry, we pride ourselves on offering exceptional
                    products at competitive prices.
                  </p>
                  <p>
                    Our showroom in Nuneaton features a wide range of wall
                    tiles, floor tiles, bathroom tiles, and outdoor options.
                    Whether you're renovating your home or working on a large
                    commercial project, our expert team is here to help you find
                    the perfect tiles for your needs.
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
          )}
        </div>
      </main>
    </div>
  );
}
