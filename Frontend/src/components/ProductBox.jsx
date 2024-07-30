import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { AuthContext } from "./Context/AuthContext";
import axios from "axios";

const ProductBox = ({
  productImage,
  productId,
  productName,
  productMRP,
  productBrand,
  productCategory,
  productRating,

  productPrice,
  productDiscount,
  isProductLiked,
  isProductAddedToCart,
  productDescription,
  productStock,
  isLoading,
  handleDislike,
}) => {
  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    const discount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discount;
    return discountedPrice;
  };
  const { token, userDetails } = useContext(AuthContext);

  const [likeLoader, setLikeLoader] = useState(false);
  const [cartLoader, setCartLoader] = useState(false);
  const dislikeProduct = async (productID) => {
    setLikeLoader(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/likeDisLikeTheProduct`,
        {
          userId: userDetails._id,
          productId: productID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("product", productID);
      console.log(response);
      if (response.data.success) {
        toast.success("Product Disliked!!!");
        handleDislike();
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error.response?.data);
    }
    setLikeLoader(false);
  };
  const addRemoveFromCart = async () => {
    setCartLoader(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/likeDisLikeTheProduct`,
        {
          userId: userDetails._id,
          productId: productID,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error.response?.data);
    }
  };

  return (
    <div className=" size-full  bg-white dark:bg-[#121212] rounded-md shadow-md p-6 cursor-pointer flex ">
      <Toaster />
      {isLoading ? (
        <>
          <div className="relative h-52 w-1/6 mr-5">
            <SkeletonTheme baseColor="#ffff" highlightColor="#e2e8f0">
              <Skeleton className="absolute inset-0 h-full w-full object-cover rounded-md aspect-3/2" />
            </SkeletonTheme>
          </div>
          <div className=" w-2/3">
            <div className=" flex flex-col gap-1">
              <span className=" text-4xl font-bold">
                <Skeleton width={300} />
              </span>
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
            </div>
            <p className=" w-full">
              <Skeleton count={5} />
            </p>
          </div>
          <div>
            <SkeletonTheme baseColor="#2563eb" highlightColor="#60a5fa">
              <Skeleton width={150} height={50} />
            </SkeletonTheme>{" "}
          </div>
        </>
      ) : (
        <>
          <div className="relative h-52 w-1/6 -ml-6 ">
            <img
              src={productImage}
              alt="Product Image"
              className="absolute inset-0 h-full w-full object-contain rounded-md aspect-3/2 "
            />
          </div>
          <div className=" w-2/3 flex flex-col justify-between">
            <div className=" flex justify-between">
              <div className=" flex flex-col gap-1">
                <span className=" text-4xl font-bold">
                  {productName} , {productBrand}
                </span>

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
                  value={productRating}
                  readOnly
                />
              </div>
              <div className="  rounded-md flex gap-5  p-4 cursor-default">
                <span
                  className=" cursor-pointer flex  items-center"
                  onClick={() => dislikeProduct(productId)}
                >
                  {likeLoader ? (
                    <LoaderIcon />
                  ) : (
                    <FavoriteIcon sx={{ color: "red" }} />
                  )}
                </span>
                {cartLoader ? (
                  <span className=" cursor-pointer flex  items-center">
                    <LoaderIcon />
                  </span>
                ) : (
                  <span className=" cursor-pointer flex  items-center">
                    {isProductAddedToCart ? (
                      <ShoppingBagIcon />
                    ) : (
                      <ShoppingBagOutlinedIcon />
                    )}
                  </span>
                )}
              </div>
            </div>

            <p>{productDescription}</p>
          </div>
          <div className=" flex  w-1/5 justify-between flex-col items-center">
            <div>
              <span>
                <span className="font-bold text-4xl font-oswald ">
                  {productDiscount.discountPercentage
                    ? `₹${calculateDiscountPrice(
                        productMRP,
                        productDiscount.discountPercentage
                      )}`
                    : `₹${productMRP}`}
                </span>
                <span className="flex items-center gap-2 text-center">
                  <span className="font-light text-2xl line-through text-center">
                    ₹{productDiscount.discountPercentage ? productPrice : ""}
                  </span>{" "}
                  <span className="text-green-600 font-semibold text-center text-medium">
                    {productDiscount.discountPercentage
                      ? `${productDiscount.discountPercentage}% off`
                      : ""}
                  </span>
                </span>
              </span>
            </div>
            {productStock < 10 ? (
              <span className=" text-red-600 text-xl w-full text-center">
                Only {productStock} stock left
              </span>
            ) : (
              ""
            )}
            <div className="w-full flex justify-center ">
              <button className="bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-sm font-bold px-8 w-1/2">
                Buy Now
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductBox;
