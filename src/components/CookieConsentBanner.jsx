import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
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
      <div className="mb-4 md:mb-0 md:mr-4 text-sm md:text-xs">
        We use essential and functional cookies on our website to provide you
        with a more personalized digital experience. If you are fine to continue
        in light of the above, please click on I Accept. However, if you do not
        wish to have non-essential cookies placed on your device, click on I
        Decline.
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleDecline}
          className="bg-gray-600 hover:bg-gray-700 min-w-36 text-white px-4 py-2 rounded flex items-center"
        >
          <CloseOutlined className="mr-2 text-xl" />I DECLINE
        </button>
        <button
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-700 min-w-32 text-white px-4 py-2 rounded flex items-center"
        >
          <CheckOutlined className="mr-2 text-xl" />I AGREE
        </button>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
