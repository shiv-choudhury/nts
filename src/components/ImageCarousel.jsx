import React, { useState, useEffect } from "react";
import Icon from "./Icon";

const ImageCarousel = ({ carouselItems = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const carouselItems = [
  //   {
  //     id: 1,
  //     image: "/api/placeholder/1200/400",
  //     title: "Premium Natural Stone Tiles",
  //     subtitle: "High-quality materials for your perfect home design"
  //   },
  //   {
  //     id: 2,
  //     image: "/api/placeholder/1200/400",
  //     title: "Designer Bathroom Collections",
  //     subtitle: "Transform your bathroom with our luxury tile ranges"
  //   },
  //   {
  //     id: 3,
  //     image: "/api/placeholder/1200/400",
  //     title: "Outdoor Living Spaces",
  //     subtitle: "Weather-resistant tiles perfect for patios and gardens"
  //   }
  // ];

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === carouselItems.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === carouselItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselItems.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Carousel Container */}
      <div className="relative w-full h-28 sm:h-96">
        {carouselItems.map((item, index) => (
          <div
            key={item?.id || index}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={item}
              alt="banner"
              className="w-full h-full object-contain sm:object-cover"
            />
            {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-white px-6">
              <h2 className="text-4xl font-bold mb-2 text-center">
                {item.title}
              </h2>
              <p className="text-xl text-center">{item.subtitle}</p>
            </div> */}
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10 flex justify-center items-center"
        aria-label="Previous slide"
      >
        <Icon icon="pi-angle-left" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 z-10 flex justify-center items-center"
        aria-label="Next slide"
      >
        <Icon icon="pi-angle-right" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors border border-white ${
              index === currentSlide
                ? "bg-[#4563e9]"
                : "bg-[#e2e2e2] bg-opacity-50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
