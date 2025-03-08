import React, { useEffect, useState } from "react";
import Icon from "./Icon";

const ReviewsCarousel = ({ reviewsData = [], stats = {}, loading }) => {
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

  if (loading) {
    return <div className="w-full bg-white py-4 md:py-8">Loading... </div>;
  }

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
              {stats?.average_rating} Average
            </span>
            <span className="text-xs md:text-base text-gray-500 mr-2">
              {stats?.total_reviews} Reviews
            </span>
            <Icon icon="arrow-right" className="text-gray-500" />
            <a
              href="https://www.reviews.co.uk/company-reviews/store/natural-tiles-stone?utm_source=natural-tiles-stone&utm_medium=widget&utm_campaign=carousel"
              target="_blank"
              className="ml-2 text-xs md:text-base text-blue-600 "
            >
              Reviews.io
            </a>
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
            {getVisibleReviews().map((review, index) => (
              <ReviewCard
                review={review}
                visibleReviews={visibleReviews}
                index={index}
              />
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

const ReviewCard = ({ review, index, visibleReviews }) => {
  const truncateLimit = 300;
  const truncateComment = (comment) => {
    if (!comment) return "";
    if (comment.length <= truncateLimit) return comment;
    return comment.substring(0, truncateLimit) + "...";
  };

  return (
    <div
      key={index}
      className={`mb-4 px-2 md:px-4 flex-shrink-0 transition-all duration-300 w-full ${
        visibleReviews === 1
          ? "w-full"
          : visibleReviews === 2
          ? "w-1/2"
          : "w-full md:w-1/2 lg:w-1/3"
      }`}
    >
      <div className="bg-white p-3 md:p-4 rounded shadow-xl h-full min-h-56 flex flex-col">
        <div className="flex justify-between items-start mb-1 md:mb-2">
          <div>
            <p className="font-semibold text-sm md:text-base">
              {review?.author}
            </p>
            <ReviewStars rating={review?.rating} />
          </div>
        </div>
        <p className="text-xs md:text-sm mb-2 md:mb-3 flex-grow">
          {truncateComment(review?.comments)}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-500 mt-auto">
          <span className="flex items-center mr-2 md:mr-4">
            {/* <img
            src={review.third_party.widget_logo}
            alt={review.third_party.name}
            className="w-4 h-4 md:w-5 md:h-5 mr-1"
          /> */}
            <Icon icon="google" className="mr-1" />
            {review?.third_party.name}
          </span>
          <span className="text-xs">{review?.timeago}</span>
        </div>
      </div>
    </div>
  );
};

const ReviewStars = ({ rating = 5 }) => {
  return (
    <div className="flex">
      {[...Array(rating)].map((_, i) => (
        <Icon icon="star-fill" className="text-[#ffbb00]" />
      ))}
    </div>
  );
};

export default ReviewsCarousel;
export { ReviewStars };
