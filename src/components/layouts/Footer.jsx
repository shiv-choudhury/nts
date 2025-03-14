import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import { FacebookFilled, InstagramOutlined } from "@ant-design/icons";
import Icon from "../Icon";
import ReviewsCarousel from "../ReviewsCarousel";
import { getReviews } from "../../apis/ApiCalls";

const Footer = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const reviews = await getReviews();

      setReviewsData(reviews?.data);
      // toast.success("Fetched Review successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="w-full">
      <ReviewsCarousel
        reviewsData={reviewsData?.reviews?.data}
        stats={reviewsData?.stats}
        loading={loading}
      />

      <div className="bg-gray-800 text-white py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* REACH US section */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 border-b border-[#d3d3d3] pb-2">
                REACH US
              </h3>
              <div className="space-y-3 md:space-y-4">
                <p className="text-sm md:text-base">
                  Unit 19, Slingsby Close, Attleborough
                </p>
                <p className="text-sm md:text-base">
                  Industrial Estate Nuneaton, CV11 6RP
                </p>
                <Link
                  to="https://www.google.com/maps/place/19+Slingsby+Cl,+Nuneaton+CV11+6RP,+UK/@52.514741,-1.449179,16z/data=!4m5!3m4!1s0x48774e24816d8e13:0x91ba7d1e6b2774a3!8m2!3d52.5147413!4d-1.4491792?hl=en-GB"
                  target="_blank"
                  className="bg-white text-gray-800 px-3 py-1 md:px-4 md:py-2 mt-2 md:mt-4 text-sm md:text-base font-medium"
                >
                  Locate Us
                </Link>

                <div className="flex items-center mt-2 md:mt-4">
                  <Icon icon="phone" className="mr-2" />
                  <span className="text-sm md:text-base">024 7637 5531</span>
                </div>

                <div className="flex items-center">
                  <Icon icon="envelope" className="mr-2" />
                  <span className="text-sm md:text-base">
                    info@naturaltilestone.co.uk
                  </span>
                </div>

                <div className="mt-3 md:mt-4">
                  <p className="mb-2 text-sm md:text-base">We accept:</p>
                  <div className="flex flex-wrap gap-2">
                    <img
                      src="assets/payment.png"
                      alt="Payment options"
                      className="md:w-80"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SHOWROOM HOURS section */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 border-b border-[#d3d3d3] pb-2">
                SHOWROOM HOURS
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm md:text-base">
                    Monday - Friday :
                  </span>
                  <span className="text-sm md:text-base">
                    9:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm md:text-base">Saturday :</span>
                  <span className="text-sm md:text-base">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm md:text-base">Sunday :</span>
                  <span className="text-sm md:text-base">Closed</span>
                </div>
              </div>
            </div>

            {/* SHOP BY section */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 border-b border-[#d3d3d3] pb-2">
                SHOP BY
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li className="text-sm md:text-base">WALL</li>
                <li className="text-sm md:text-base">FLOOR</li>
                <li className="text-sm md:text-base">BATHROOM</li>
                <li className="text-sm md:text-base">PORCELAIN</li>
                <li className="text-sm md:text-base">WOOD EFFECT</li>
                <li className="text-sm md:text-base">OUTDOOR</li>
                <li className="text-sm md:text-base">ACCESSORIES</li>
                <li className="text-sm md:text-base">CLEARANCE</li>
              </ul>
            </div>

            {/* CUSTOMER SERVICE section */}
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-4 md:mb-6 border-b border-[#d3d3d3] pb-2">
                CUSTOMER SERVICE
              </h3>
              <ul className="space-y-1 md:space-y-2">
                <li className="text-sm md:text-base">About Us</li>
                <li className="text-sm md:text-base">Why Choose Us</li>
                <li className="text-sm md:text-base">Contact Us</li>
                <li className="text-sm md:text-base">Delivery and Returns</li>
                <li className="text-sm md:text-base">Privacy Policy</li>
              </ul>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-[#d3d3d3] flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs md:text-sm mb-4 md:mb-0 text-center md:text-left">
              © 2025 Copyright The Natural Stone and Tiles Co. | All Rights
              Reserved
            </p>
            <div className="flex items-center space-x-4">
              <Link
                to="https://www.facebook.com/NuneatonTiles/"
                target="_blank"
                className="flex items-center bg-blue-600 p-1 md:p-2 rounded-full"
              >
                <FacebookFilled className="text-white text-2xl" />
              </Link>
              <Link
                to="https://www.instagram.com/naturalstoneandtileco"
                target="_blank"
                className="flex items-center bg-pink-600 p-1 md:p-2 rounded-full"
              >
                <InstagramOutlined className="text-white text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
