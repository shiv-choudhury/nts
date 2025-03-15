import React, { useState, useEffect } from "react";

const CountdownBanner = () => {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [offerEnded, setOfferEnded] = useState(true);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

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
  }, []);

  return (
    <div className="w-full bg-black text-white py-8">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl font-bold mb-6">
          HUGE SAVINGS, MASSIVE DISCOUNTS!
        </h1>

        {offerEnded ? (
          <div className="text-red-500 text-2xl font-bold mb-6">
            OFFER HAS ENDED!
          </div>
        ) : null}

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
      </div>
    </div>
  );
};

export default CountdownBanner;
