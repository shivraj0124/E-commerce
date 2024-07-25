import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AuthContext } from "../Context/AuthContext.jsx";
import axios from "axios";

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
  const { userDetails, token } = useContext(AuthContext);

  const [userLikes, setUserLikes] = useState([]);
  const [loadingLike, setLoadingLike] = useState(false);
  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    const discount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discount;
    return discountedPrice;
  };

  const getAllLikesByUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getAllLikesByUser`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserLikes(response.data.likes);
    } catch (error) {
      console.log(error);
    }
  };

  const likeDislikeProduct = async (productid) => {
    setLoadingLike(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/likeDisLikeTheProduct`,
        {
          userId: userDetails._id,
          productId: productid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        if (response.data.message === "Product Disliked Successfully.") {
          setUserLikes(userLikes.filter((id) => id !== productid));
        } else if (response.data.message === "Product Liked Successfully.") {
          setUserLikes([...userLikes, productid]);
        }
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setLoadingLike(false);
  };

  useEffect(() => {
    if (token) {
      getAllLikesByUser();
    }
  }, [token]);

  return (
    <>
      <Toaster />
      {loading ? (
        <div className="h-full md:flex bg-white dark:bg-[#121212] rounded-md flex-wrap justify-around shadow-md mb-5 hidden cursor-pointer px-6 py-5 w-full">
          <div className="flex w-4/5 justify-between">
            <div className="relative h-52 w-1/6">
              <Skeleton className="absolute inset-0 h-full w-full object-cover rounded-md aspect-3/2" />
            </div>
            <div className="flex flex-col justify-between p-4 items-start w-4/5 flex-none">
              <div className="flex flex-col w-full">
                <span className="text-3xl font-bold">
                  <Skeleton width={200} /> <Skeleton width={100} />
                </span>
                <span className="flex items-center gap-2">
                  <Rating
                    name="read-only"
                    sx={{
                      "& .MuiRating-icon": {
                        color: "gold",
                      },
                      "& .MuiRating-iconEmpty": {
                        color: "gold",
                      },
                      "& .MuiRating-iconFilled": {
                        color: "gold",
                      },
                      "& .MuiRating-iconHover": {
                        color: "gold",
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
          <div className="p-4 flex  px-10">
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
            <span className=" text-center ">
              <FavoriteBorderIcon />
            </span>
          </div>
        </div>
      ) : (
        <div className="h-full md:flex bg-white dark:bg-[#121212] rounded-md flex-wrap justify-around shadow-md mb-5 hidden cursor-pointer px-6 py-5 w-full flex-row ">
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
                  {productName} , {productBrand}
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
          <div className="p-4 flex  w-1/5 justify-around">
            <div className="flex flex-col justify-between h-full">
              <div className="flex flex-col">
                <span className="font-bold text-3xl font-oswald ">
                  {productDiscount
                    ? `₹${calculateDiscountPrice(
                        productPrice,
                        productDiscount.discountPercentage
                      )}`
                    : `₹${productPrice}`}
                </span>
                <span className="flex items-center gap-1 text-center">
                  <span className="font-light text-xl line-through text-center">
                    {productDiscount ? productPrice : ""}
                  </span>{" "}
                  <span className="text-green-600 font-semibold text-center">
                    {productDiscount
                      ? `${productDiscount.discountPercentage}% off`
                      : ""}
                  </span>
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
            <span
              className=" text-center cursor-pointer "
              onClick={() => likeDislikeProduct(productid)}
            >
              {loadingLike ? (
                <LoaderIcon />
              ) : userLikes && userLikes.includes(productid) ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </span>
          </div>
        </div>
      )}
      {/* Mobile view skeleton or product card can be similarly handled */}
    </>
  );
};

export default SearchResult;
