import React, { useState, useEffect } from "react";

const CookieConsentBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [hasConsented, setHasConsented] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consentStatus = localStorage.getItem("cookieConsent");
    if (consentStatus) {
      setIsVisible(false);
      setHasConsented(consentStatus === "accepted");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setHasConsented(true);
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setHasConsented(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-4 px-6 flex flex-col md:flex-row items-center justify-between z-50 shadow-lg">
      <div className="mb-4 md:mb-0 md:mr-4 text-sm md:text-base">
        We use essential and functional cookies on our website to provide you
        with a more personalized digital experience. If you are fine to continue
        in light of the above, please click on I Accept. However, if you do not
        wish to have non-essential cookies placed on your device, click on I
        Decline.
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleDecline}
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          I DECLINE
        </button>
        <button
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          I AGREE
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
