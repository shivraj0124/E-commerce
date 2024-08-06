import React, { useContext, useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AuthContext } from "../Context/AuthContext.jsx";
import axios from "axios";
import { ProductContext } from "../Context/ProductContext.jsx";

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
  hasLiked,
  hasAddedToCart,
  onProductUpdate,
}) => {
  const { userDetails, token, updateFields } = useContext(AuthContext);
  const [loadingLike, setLoadingLike] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    const discount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discount;
    return discountedPrice;
  };

  const [Loading, setLoading] = useState(false);
  const likeDislikeProduct = async (productid) => {
    setLoadingLike(true);
    try {
      // Optimistically update UI
      onProductUpdate(productid, { hasLiked: !hasLiked });
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
      // Check response and revert optimistic update if needed
      if (!response.data.success) {
        onProductUpdate(productid, { hasLiked });
        updateFields();
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      onProductUpdate(productid, { hasLiked });
      toast.error(error.response?.data.message);
      console.log(error);
    } finally {
      setLoadingLike(false);
    }
  };

  const AddProductToCart = async (productID) => {
    setButtonLoading(true);
    try {
      // Optimistically update UI
      onProductUpdate(productID, { hasAddedToCart: true });
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/addToCart`,
        {
          productId: productID,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.data.success) {
        onProductUpdate(productID, { hasAddedToCart: false });
        updateFields();
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      onProductUpdate(productID, { hasAddedToCart: false });
      toast.error("Something Went Wrong");
    } finally {
      setButtonLoading(false);
    }
  };
  const removeProductFromCart = async () => {
    setButtonLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/removeFromCart`,
        { productId: productid },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        onProductUpdate(productid, { hasAddedToCart: false });
        updateFields();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
    setButtonLoading(false);
  };

  const openProductPage = async (productId) => {
    window.open(`${window.location.origin}/product/${productId}`);
    console.log(productId);
  };
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
        <div
          className="h-full md:flex bg-white dark:bg-[#121212] rounded-md flex-wrap justify-around shadow-md mb-5 hidden cursor-pointer px-6 py-5 w-full flex-row "
          onClick={() => openProductPage(productid)}
        >
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
              <button className=" ">
                {buttonLoading ? (
                  <LoaderIcon />
                ) : hasAddedToCart ? (
                  <span
                    className=" bg-red-600 hover:bg-red-700 px-8 py-3 text-white   rounded-sm font-bold "
                    onClick={() => removeProductFromCart(productid)}
                  >
                    Remove From Cart
                  </span>
                ) : (
                  <span
                    className=" bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white   rounded-sm font-bold "
                    onClick={() => AddProductToCart(productid)}
                  >
                    Add To Cart
                  </span>
                )}
              </button>
            </div>
            <span
              className=" text-center cursor-pointer "
              onClick={() => likeDislikeProduct(productid)}
            >
              {loadingLike ? (
                <LoaderIcon />
              ) : hasLiked ? (
                <FavoriteIcon sx={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </span>
          </div>
        </div>
      )}
      {Loading ? (
        <div className="h-full sm:hidden bg-white dark:bg-[#121212] rounded-md w-full gap-2 shadow-md flex px-3 py-3">
          <div className="relative h-32 w-1/3 ">
            <Skeleton
              alt="product image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className=" flex flex-col w-2/3 justify-between">
            <div className=" flex flex-col justify-between">
              <span className=" text-xl font-bold">
                <Skeleton width={100} />
              </span>
              <div className=" w-full">
                <p className="line-clamp-2 overflow-hidden text-ellipsis text-xs">
                  <Skeleton count={3} />
                </p>
              </div>
            </div>
            <div className=" font-semibold text-xl ml-3 flex justify-between items-center m-2">
              <span>
                <Skeleton width={50} />
              </span>
              <span className=" font-light line-through">
                <Skeleton width={50} />
              </span>
              <span className=" text-green-600 text-sm ">
                <Skeleton width={50} />
              </span>
            </div>
            <div className=" flex items-center justify-around">
              <SkeletonTheme baseColor="#2563eb" highlightColor="#60a5fa">
                <Skeleton width={150} height={50} />
              </SkeletonTheme>{" "}
              <FavoriteBorderIcon />
            </div>
          </div>
        </div>
      ) : (
        <div
          className="h-full sm:hidden bg-white dark:bg-[#121212] rounded-md w-full gap-2 shadow-md flex px-3 py-3 mb-5"
          onClick={() => openProductPage(productid)}
        >
          <div className="relative h-32 w-1/3 ">
            <img
              src={productImage[0]}
              alt="product image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className=" flex flex-col w-2/3 justify-between">
            <div className=" flex flex-col justify-between">
              <div className=" ">
                <span className=" text-xl font-bold">{productName}</span>
                <div className=" w-full">
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-xs">
                    {productDesc}
                  </p>
                </div>
                <div className=" font-semibold text-xl ml-3 flex justify-between items-center m-2">
                  <span>
                    {productDiscount
                      ? `₹${calculateDiscountPrice(
                          productPrice,
                          productDiscount.discountPercentage
                        )}`
                      : `₹${productPrice}`}
                  </span>
                  <span className=" font-light line-through">
                    {productDiscount ? productPrice : ""}
                  </span>
                  <span className=" text-green-600 text-sm ">
                    {productDiscount
                      ? `${productDiscount.discountPercentage}% off`
                      : ""}
                  </span>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-around mt-3">
              <button className="">
                {buttonLoading ? (
                  <LoaderIcon />
                ) : hasAddedToCart ? (
                  <span
                    className=" bg-red-600 hover:bg-red-700 px-8 py-3 text-white   rounded-sm font-bold "
                    onClick={() => removeProductFromCart(productid)}
                  >
                    Remove From Cart
                  </span>
                ) : (
                  <span
                    className=" bg-blue-600 hover:bg-blue-700 px-8 py-3 text-white   rounded-sm font-bold "
                    onClick={() => AddProductToCart(productid)}
                  >
                    Add To Cart
                  </span>
                )}
              </button>
              <span onClick={() => likeDislikeProduct(productid)}>
                {loadingLike ? (
                  <LoaderIcon />
                ) : hasLiked ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
