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
  const [buttonLoading, setButtonLoading] = useState(false);
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
  const data = {
    _id: "669c116adcc472ba526ef81b",
    name: "Iphone 15 Pro Max",
    description:
      "iPhone 15 Pro Max, a titanium marvel, boasts an aerospace-grade build, making it the lightest Pro model ever. The A17 Pro Chip marks a historic leap in Apple GPUs, delivering unparalleled graphics performance and immersive gaming experiences. The camera system shines with a 48 MP Main camera, offering remarkable detail and automatic portrait enhancements. Convenience is key with the Action button for quick tasks and Focus filters. Plus, it's USB 3 compatible, revolutionizing data transfer speeds. This iPhone even shares its charging cable with your Mac or iPad. Embrace innovation, cut cable clutter, and elevate your mobile experience with the iPhone 15 Pro Max.",
    price: 139990,
    category: "669bba393939bbd37a7bf346",
    brand: "Apple",
    stock: 50,
    ratings: 0,
    numReviews: 0,
    images: [
      "https://iplanet.one/cdn/shop/files/iPhone_15_Pro_Max_Natural_Titanium_PDP_Image_Position-1__en-IN_fb4edf23-fd9d-4921-ab06-aec128ba2698.jpg?v=1695436281&width=1445",
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-15-pro-max-family-select?wid=4000&hei=3794&fmt=jpeg&qlt=90&.v=1692893974945",
      "https://www.apple.com/newsroom/videos/iphone-15-pro-action-button/posters/Apple-iPhone-15-Pro-lineup-Action-button-230912.jpg.large_2x.jpg",
    ],
    likes: ["669d438c6ce5a304c160efc2"],
    reviews: [],
    createdAt: "2024-07-20T19:35:06.001Z",
    updatedAt: "2024-07-21T17:21:16.432Z",
    __v: 17,
  };
  const [Loading, setLoading] = useState(false);
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
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message);
        console.log(response);
      }
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(error);
    }
    setLoadingLike(false);
  };

  useEffect(() => {
    if (token) {
      getAllLikesByUser();
    }
  }, [token]);
  const AddProductToCart = async (productID) => {
    setButtonLoading(true);
    try {
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
      if (response.data.success) {
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
              <button
                className="bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-sm font-bold px-8"
                onClick={() => AddProductToCart(productid)}
              >
                {buttonLoading ? <LoaderIcon /> : "Add to Cart"}
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
      {Loading ? (
        <div className="h-full sm:hidden bg-white dark:bg-[#121212] rounded-md w-full gap-2 shadow-md flex px-3 py-3">
          <div className="relative h-32 w-1/3 ">
            <Skeleton
              src="https://switch.com.ph/cdn/shop/files/ROSA_Apple_Watch_Ultra_2_LTE_49mm_Titanium_Blue_Black_Trail_Loop_PDP_Image_Position-1.jpg?v=1698388489&width=1000"
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
        <div className="h-full sm:hidden bg-white dark:bg-[#121212] rounded-md w-full gap-2 shadow-md flex px-3 py-3 mb-5">
          <div className="relative h-32 w-1/3 ">
            <img
              src="https://switch.com.ph/cdn/shop/files/ROSA_Apple_Watch_Ultra_2_LTE_49mm_Titanium_Blue_Black_Trail_Loop_PDP_Image_Position-1.jpg?v=1698388489&width=1000"
              alt="product image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className=" flex flex-col w-2/3 justify-between">
            <div className=" flex flex-col justify-between">
              <div className=" ">
                <span className=" text-xl font-bold">{data.name}</span>
                <div className=" w-full">
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-xs">
                    {data.description}
                  </p>
                </div>
                <div className=" font-semibold text-xl ml-3 flex justify-between items-center m-2">
                  <span>₹{data.price}</span>
                  <span className=" font-light line-through">₹59999</span>
                  <span className=" text-green-600 text-sm ">20% off</span>
                </div>
              </div>
            </div>
            <div className=" flex items-center justify-around mt-3">
              <button className="bg-blue-600 text-white hover:bg-blue-700 py-3 rounded-sm font-bold px-8">
                Add to Cart
              </button>
              <FavoriteBorderIcon />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchResult;
