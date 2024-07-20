import React, { useContext } from "react";
import Rating from "@mui/material/Rating";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../Context/ThemeContext";
const SearchResult = ({
  productid,
  productName,
  productDesc,
  productPrice,
  productBrand,
  productStock,
  productRatings,
  productNumReviews,
  productImage,
  productDiscount,
  loading,
}) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme === "dark";
  return (
    <>
      {loading ? (
        <div className="h-full md:flex bg-white dark:bg-[#121212] rounded-md flex-wrap justify-around shadow-md mb-5 hidden cursor-pointer px-10 py-3 w-full">
          <div className="flex w-4/5 justify-between">
            <div className="relative h-52 w-1/6">
              <Skeleton className="absolute inset-0 h-full w-full object-cover rounded-md aspect-3/2" />
            </div>
            <div className="flex flex-col justify-between p-4 items-start w-4/5 flex-none">
              <div className="flex flex-col w-full">
                <span className="text-3xl font-bold">
                  <Skeleton width={200} /> || <Skeleton width={100} />
                </span>
                <span className="flex items-center gap-2">
                  <Rating
                    name="read-only"
                    sx={{
                      "& .MuiRating-icon": {
                        color: "gold", // Golden color for both filled and empty stars
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "gold", // Golden color for empty stars
                      },
                      "& .MuiRating-iconFilled": {
                        color: "gold", // Golden color for filled stars
                      },
                      "& .MuiRating-iconHover": {
                        color: "gold", // Golden color for hover
                      },
                    }}
                    value={0}
                    readOnly
                  />
                  <span className="font-medium text-lg">
                    <Skeleton width={100} />
                  </span>
                </span>
              </div>
              <div className="w-full">
                <p className="line-clamp-4">
                  <Skeleton count={3} />
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col px-10">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <span className="font-bold text-3xl font-oswald">
                  <Skeleton width={100} />
                </span>
                <span className="flex items-center gap-1">
                  <Skeleton width={80} />
                  <span className="text-green-600 font-semibold">
                    <Skeleton width={60} />
                  </span>
                </span>
                <span className="text-red-500 font-semibold">
                  <Skeleton width={100} />
                </span>
              </div>
              <SkeletonTheme baseColor="#2563eb" highlightColor="#60a5fa">
                <Skeleton width={150} height={50} />
              </SkeletonTheme>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full md:flex bg-white dark:bg-[#121212] rounded-md flex-wrap justify-around shadow-md mb-5 hidden cursor-pointer px-10 py-3 w-full flex-row">
          <div className="flex w-4/5 justify-between ">
            <div className="relative h-52 w-1/6">
              <img
                src={productImage[0]}
                className="absolute inset-0 h-full w-full object-cover rounded-md aspect-3/2"
                alt="product image"
              />
            </div>
            <div className="flex flex-col justify-between p-4 items-start w-4/5 flex-none">
              <div className="flex flex-col w-full">
                <span className="text-3xl font-bold">
                  {productName} || {productBrand}
                </span>
                <span className="flex items-center gap-2">
                  <Rating
                    name="read-only"
                    sx={{
                      "& .MuiRating-icon": {
                        color: "gold", // Golden color for both filled and empty stars
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "gold", // Golden color for empty stars
                      },
                      "& .MuiRating-iconFilled": {
                        color: "gold", // Golden color for filled stars
                      },
                      "& .MuiRating-iconHover": {
                        color: "gold", // Golden color for hover
                      },
                    }}
                    value={productRatings}
                    readOnly
                  />
                  <span className="font-medium text-lg">
                    {productNumReviews} reviews
                  </span>
                </span>
              </div>
              <div className="w-full">
                <p className="line-clamp-4 overflow-hidden text-ellipsis">
                  {productDesc}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 flex flex-col px-10">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <span className="font-bold text-3xl font-oswald">
                  ₹{productPrice}
                </span>
                <span className="flex items-center gap-1">
                  <span className="font-light text-xl line-through text-center">
                    ₹30000
                  </span>{" "}
                  {/* {productDiscount =! undefined && (
                    <span className="text-green-600 font-semibold">
                      `${productDiscount}% off`
                    </span>
                  )} */}
                </span>
                {productStock <= 5 && (
                  <span className="text-red-500 font-semibold">
                    Only {productStock} left
                  </span>
                )}
              </div>
              <button className="bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-sm font-bold px-8">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile view skeleton or product card can be similarly handled */}
    </>
  );
};

export default SearchResult;
