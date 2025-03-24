import React, { useState, useEffect } from "react";
import parse from "html-react-parser";

const CountdownBanner = ({ data }) => {
  const countdownData = data?.find(
    (item) => item?.dynamic_section === "header_timer"
  );

  if (!countdownData || countdownData?.status !== "Active") {
    return null;
  }

  const title = countdownData?.extra || "Limited Time Offer!";
  const endTimeString = countdownData?.content
    ? parse(countdownData.content).props.children
    : null;

  const endTime = endTimeString
    ? new Date(endTimeString.replace("T", " "))
    : null;

  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [offerEnded, setOfferEnded] = useState(false);

  useEffect(() => {
    if (!endTime || isNaN(endTime.getTime())) {
      setOfferEnded(true);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        setOfferEnded(true);
        clearInterval(interval);
        return;
      }

      setOfferEnded(false);

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeRemaining({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="w-full bg-black text-white py-8 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        {offerEnded ? (
          <div className="text-red-500 text-2xl font-bold mb-6">
            OFFER HAS ENDED!
          </div>
        ) : (
          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0">
            {Object.entries(timeRemaining).map(([label, value]) => (
              <div key={label} className="flex flex-col items-center">
                <div className="bg-white text-red-600 w-20 h-16 flex items-center justify-center text-3xl font-bold rounded">
                  {value}
                </div>
                <span className="mt-2 capitalize">{label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CountdownBanner;
