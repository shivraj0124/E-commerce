import React, { useEffect, useState } from "react";

const DiscountBanner = ({
  discountName,
  productImage,
  discountDate,
  productPrice,
  productDesc,
}) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(discountDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [discountDate]);

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <div
      key={interval}
      className="flex flex-col max-md:text-gray-600  max-md:font-bold max-md:border-gray-400 items-center bg-white text-center sm:p-3 rounded-lg border-slate-300 sm:border-4 border-2 p-2"
    >
      <div className="">
        <div className="text-xs max-md:text-[14px] ">
          {interval.toUpperCase()}
        </div>

        <div className="sm:text-4xl font-bold text-xs max-md:text-sm">
          {timeLeft[interval]}
        </div>
      </div>
    </div>
  ));

  return (
    <>
      <div className="w-screen flex bg-slate-100  sm:min-h-[1/8] justify-center sm:gap-12 cursor-pointer sm:flex-row flex-col h-full sm:h-full p-6 max-md:hidden">
        <div className="sm:text-7xl font-bold flex items-center text-3xl text-center mb-6 sm:mb-0">
          {discountName}
        </div>
        <div className="flex flex-col sm:flex-row items-center sm:gap-12  -ml-6  ">
          <div className="w-full sm:w-auto max-w-xs sm:max-w-[1/8] sm:max-h-64 mb-4 sm:mb-0  flex items-center justify-center">
            <img
              src={productImage}
              alt="product image"
              className="w-3/4 h-auto sm:max-w-[1/8] sm:max-h-64 mix-blend-multiply rotate-12 object-contain "
            />
          </div>
          <div className="flex flex-col p-10 justify-between gap-5 w-full sm:w-auto items-center -ml-16 ">
            <div className="flex space-x-2 items-center justify-center text-center ">
              {timerComponents.length === 0 ? (
                <span className="text-center text-2xl font-bold flex items-center">
                  Time's Up!
                </span>
              ) : (
                timerComponents
              )}
            </div>
            <div className="flex sm:flex-col gap-3 text-center items-center">
              <span className="font-bold sm:text-2xl text-center text-slate-600 text-xl">
                {productDesc}
              </span>
              <span className="font-bold sm:text-5xl text-center text-3xl">
                ${productPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-3 pt-2 w-full md:hidden flex justify-between bg-slate-100  overflow-hidden   cursor-pointer ">
        <div className="flex flex-col w-[50%] ">
          <div className="text-xl font-bold flex text-black">
            {discountName}
          </div>

          <div className="flex flex-col w-full justify-between gap-5 mt-2">
            <div className="flex gap-x-2 ">
              {timerComponents.length === 0 ? (
                <span className="text-center text-2xl font-bold flex items-center">
                  Time's Up!
                </span>
              ) : (
                <span className=" grid grid-cols-2 gap-2  ">
                  {timerComponents}
                </span>
              )}
            </div>
            <div className=" flex flex-col w-max">
              <span className=" font-bold text-xl text-center text-slate-600">
                {productDesc}
              </span>
              <span className="  font-bold text-xl text-left text-black">
                ${productPrice}
              </span>
            </div>
          </div>
        </div>
        <div className="flex  items-center">
          <img
            src={productImage}
            alt="prodcut image"
            className="h-[180px] mix-blend-multiply rotate-12 object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default DiscountBanner;
