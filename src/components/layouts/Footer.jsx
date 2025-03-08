import React, { useState, useEffect } from "react";

import { FacebookFilled, InstagramOutlined } from "@ant-design/icons";
import Icon from "../Icon";

const reviewsData = [
  {
    id: 1,
    name: "Grzegorz Ręka",
    rating: 5,
    comment: "I have bought tiles many times and I recommend them",
    source: "Google Local",
    postedDate: "Posted 6 months ago"
  },
  {
    id: 2,
    name: "Rob Corbey",
    rating: 5,
    comment:
      "Absolutely amazing experience. Rohit was so helpful and really helped us to achieve our dream goal. After many years of buying tiles and outdoor Stone, the experience with the natural stone and tile numaton ha...",
    source: "Google Local",
    postedDate: "Posted 9 months ago"
  },
  {
    id: 3,
    name: "Phil Salt",
    rating: 5,
    comment: "Excellent prices and service",
    source: "Google Local",
    postedDate: "Posted 1 year ago"
  },
  {
    id: 4,
    name: "Kapil Deepti",
    rating: 5,
    comment:
      "Great products, great prices and a great service from Rohit. Highly recommend.",
    source: "Google Local",
    postedDate: "Posted 1 year ago"
  },
  {
    id: 5,
    name: "Darshan Mangat",
    rating: 5,
    comment:
      "An amazing customer experience from start to finish, Rohit is a really competent and passionate business owner, one of the few around that really value customer service! I ordered tiles that turned out to not b...",
    source: "Google Local",
    postedDate: "Posted 1 year ago"
  }
];

const ReviewStars = ({ rating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(rating)].map((_, i) => (
        <Icon icon="star-fill" className="text-[#ffbb00]" />
      ))}
    </div>
  );
};

const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 >= reviewsData.length ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? reviewsData.length - 1 : prevIndex - 1
    );
  };

  // Update visible reviews based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleReviews(1); // Mobile: 1 review
      } else if (window.innerWidth < 1024) {
        setVisibleReviews(2); // Tablet: 2 reviews
      } else {
        setVisibleReviews(3); // Desktop: 3 reviews
      }
    };

    // Set initial value
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-scroll the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Get the reviews to display based on currentIndex
  const getVisibleReviews = () => {
    const reviews = [];
    for (let i = 0; i < visibleReviews; i++) {
      const index = (currentIndex + i) % reviewsData.length;
      reviews.push(reviewsData[index]);
    }
    return reviews;
  };

  return (
    <div className="w-full bg-white py-4 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-4 md:mb-6">
          <div className="flex items-center mb-1 md:mb-2">
            <span className="text-base md:text-lg font-bold mr-2">
              EXCELLENT
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 md:w-5 md:h-5 text-orange-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="flex items-center flex-wrap justify-center">
            <span className="text-sm md:text-lg font-semibold mr-2">
              5.00 Average
            </span>
            <span className="text-xs md:text-base text-gray-500 mr-2">
              139 Reviews
            </span>
            <Icon icon="arrow-right" className="text-gray-500" />
          </div>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md z-10 flex items-center justify-center"
            aria-label="Previous review"
          >
            <Icon icon="angle-left" />
          </button>

          <div className="flex overflow-hidden">
            {getVisibleReviews().map((review) => (
              <div
                key={review.id}
                className={`px-2 md:px-4 flex-shrink-0 transition-all duration-300 w-full ${
                  visibleReviews === 1
                    ? "w-full"
                    : visibleReviews === 2
                    ? "w-1/2"
                    : "w-full md:w-1/2 lg:w-1/3"
                }`}
              >
                <div className="bg-white p-3 md:p-4 rounded shadow">
                  <div className="flex justify-between items-start mb-1 md:mb-2">
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        {review.name}
                      </p>
                      <ReviewStars rating={review.rating} />
                    </div>
                  </div>
                  <p className="text-xs md:text-sm mb-2 md:mb-3">
                    {review.comment}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="flex items-center mr-2 md:mr-4">
                      <Icon icon="google" className="mr-1" />
                      {review.source}
                    </span>
                    <span className="text-xs">{review.postedDate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-1 md:p-2 rounded-full shadow-md z-10 flex items-center justify-center"
            aria-label="Next review"
          >
            <Icon icon="angle-right" />
          </button>
        </div>

        {/* Review indicators/dots for mobile */}
        <div className="flex justify-center mt-4">
          {reviewsData.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 mx-1 rounded-full ${
                index === currentIndex ? "bg-blue-600" : "bg-gray-300"
              }`}
              aria-label={`Go to review ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="w-full">
      <ReviewsCarousel />

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
                <a
                  href="https://www.google.com/maps/place/19+Slingsby+Cl,+Nuneaton+CV11+6RP,+UK/@52.514741,-1.449179,16z/data=!4m5!3m4!1s0x48774e24816d8e13:0x91ba7d1e6b2774a3!8m2!3d52.5147413!4d-1.4491792?hl=en-GB"
                  target="_blank"
                  className="bg-white text-gray-800 px-3 py-1 md:px-4 md:py-2 mt-2 md:mt-4 text-sm md:text-base font-medium"
                >
                  Locate Us
                </a>

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
              <a
                href="https://www.facebook.com/NuneatonTiles/"
                target="_blank"
                className="flex items-center bg-blue-600 p-1 md:p-2 rounded-full"
              >
                <FacebookFilled className="text-white text-2xl" />
              </a>
              <a
                href="https://www.instagram.com/naturalstoneandtileco"
                target="_blank"
                className="flex items-center bg-pink-600 p-1 md:p-2 rounded-full"
              >
                <InstagramOutlined className="text-white text-2xl" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
