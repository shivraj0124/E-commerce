import React, { useEffect, useState } from "react";

const DiscountBanner = ({
  discountName,
  productImage,
  discountDate,
  productPrice,
  MRP,
  productDesc,
  productId,
}) => {
  const calculateTimeLeft = () => {
    const targetDate = new Date(discountDate);
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [discountDate]);

  const openProductPage = (productId) => {
    window.open(`${window.location.origin}/product/${productId}`, "_blank");
  };

  const timerComponents = Object.keys(timeLeft).map((interval, index) => (
    <div key={index} className="text-center">
      <div className="text-sm font-semibold">{interval.toUpperCase()}</div>
      <div className="text-3xl font-bold animate-pulse">
        {timeLeft[interval]}
      </div>
    </div>
  ));

  return (
    <>
      {/* Desktop View */}
      <div
        className="w-full flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-lg shadow-lg cursor-pointer transition-transform transform hover:scale-105 sm:flex-row flex-col mb-4"
        onClick={() => openProductPage(productId)}
      >
        <h1 className="text-4xl sm:text-6xl font-bold">{discountName}</h1>
        
        <div className="flex items-center justify-center mt-4 sm:mt-0">
          <img
            src={productImage}
            alt="product"
            className="w-40 h-40 object-contain rounded-lg shadow-md transform transition duration-500 hover:rotate-6"
          />
        </div>

        <div className="flex flex-col items-center sm:items-start p-6 text-center sm:text-left">
          <div className="grid grid-cols-4 gap-4 mb-4">
            {timerComponents.length === 0 ? (
              <span className="text-xl font-bold">Time's Up!</span>
            ) : (
              timerComponents
            )}
          </div>

          <p className="text-lg font-semibold text-gray-200">{productDesc}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold">₹{productPrice}</span>
            <span className="text-xl line-through text-gray-400">₹{MRP}</span>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div
        className="w-full flex flex-col items-center p-4 bg-gradient-to-r from-blue-500 via-teal-500 to-green-500 text-white rounded-lg shadow-lg sm:hidden mb-4"
        onClick={() => openProductPage(productId)}
      >
        <h1 className="text-3xl font-bold mb-2">{discountName}</h1>

        <div className="flex items-center justify-center mb-4">
          <img
            src={productImage}
            alt="product"
            className="w-32 h-32 object-contain rounded-lg shadow-md transform transition duration-500 hover:rotate-6"
          />
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          {timerComponents.length === 0 ? (
            <span className="text-xl font-bold">Time's Up!</span>
          ) : (
            timerComponents
          )}
        </div>

        <p className="text-md font-semibold text-gray-200 text-center mb-2">
          {productDesc}
        </p>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-extrabold">₹{productPrice}</span>
          <span className="text-lg line-through text-gray-400">₹{MRP}</span>
        </div>
      </div>
    </>
  );
};

export default DiscountBanner;

