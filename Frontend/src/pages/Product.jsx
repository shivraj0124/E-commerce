import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../Components/Context/ProductContext";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// Import Swiper styles

import "swiper/css";
import "swiper/css/navigation";
import { AuthContext } from "../Components/Context/AuthContext";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { FavoriteOutlined } from "@mui/icons-material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DiscountIcon from "@mui/icons-material/Discount";
const Product = () => {
  const { userDetails, token, updateFields } = useContext(AuthContext);
  const [loadingLike, setLoadingLike] = useState(false);

  const [productLoading, setProductLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [isDiscountValid, setIsDiscountValid] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const date = new Date();
  const today = date.getTime();
  const [discountDate, setDiscountDate] = useState(null);
  const navigate = useNavigate();
  // console.log(userDetails)
  const openProductPage = async () => {
    setProductLoading(true);
    try {
      const getProductIdFromUrl = () => {
        const path = location.pathname;
        const segments = path.split("/");
        return segments[segments.length - 1];
      };
      const productId = getProductIdFromUrl();

      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/getSingleProduct/${productId}`
      );

      if (response.data.success) {
        setProduct(response.data.product[0]);
        // console.log(product)
        const discountDate = new Date(
          response.data.product[0].discount.endDate
        );
        setDiscountDate(discountDate);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }

    setProductLoading(false);
  };

  const likeDislikeProduct = async (productId) => {
    setLoadingLike(true);
    try {
      // Optimistically update UI
      // onProductUpdate(productid, { hasLiked: !hasLiked });
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/likeDisLikeTheProduct`,
        {
          userId: userDetails._id,
          productId: productId,
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
        // onProductUpdate(productid, { hasLiked });
        updateFields();
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
    } catch (error) {
      // onProductUpdate(productid, { hasLiked });
      toast.error(error.response?.data.message);
      console.log(error);
    } finally {
      setLoadingLike(false);
    }
  };

  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    const discount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discount;
    return discountedPrice;
  };

  const formatPrice = (price) => {
    if (!price) return "0";
    const numStr = price.toString();
    const lastThree = numStr.substring(numStr.length - 3);
    const otherNumbers = numStr.substring(0, numStr.length - 3);
    const result = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return result.length > 0 ? result + "," + lastThree : lastThree;
  };

  useEffect(() => {
    openProductPage();
  }, []);

  return (
    <>
      <Toaster />
      {!error ? (
        <div className="">
          {productLoading ? (
            <div></div>
          ) : (
            <div className=" ">
              <div className="hidden sm:md:flex dark:bg-[#121212] bg-slate-200">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="h-1/4 w-1/2"
                >
                  {product?.images.map((image, index) => {
                    return (
                      <SwiperSlide key={index} className="h-52 w-1/6">
                        <img
                          src={image}
                          alt="product"
                          className="inset-0 h-full w-full object-contain rounded-md aspect-3/2"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className="flex flex-col sm:md:hidden dark:bg-[#121212] bg-slate-200 w-screen overflow-x-hidden">
                <div className="flex flex-col">
                  <span className="flex  w-screen p-2 justify-end">
                    <span className="text-xl font-bold items-center flex gap-1 ">
                      {product?.ratings}
                      <Rating
                        name="read-only"
                        sx={{
                          "& .MuiRating-icon": {
                            color: "gold", // Golden color for both filled and empty stars
                          },
                          "& .MuiRating-iconEmpty": {
                            color: "goldenrod", // Golden color for empty stars
                          },
                          "& .MuiRating-iconFilled": {
                            color: "gold", // Golden color for filled stars
                          },
                          "& .MuiRating-iconHover": {
                            color: "gold", // Golden color for hover
                          },
                        }}
                        value={product?.ratings}
                        readOnly
                      />
                      <span className="text-blue-400">
                        {product?.numReviews}
                      </span>
                    </span>
                  </span>
                  <span className="text-2xl font-bold p-3">
                    {product?.name} from{" "}
                    <span className="font-semibold underline">
                      {product?.brand}
                    </span>
                  </span>
                </div>
                <div className="mt-1 rounded-md">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="h-2/3 w-2/3"
                  >
                    {product?.images.map((image, index) => {
                      return (
                        <SwiperSlide key={index} className="h-full w-1/3">
                          <img
                            src={image}
                            alt="product"
                            className="inset-0 h-full w-full object-contain rounded-md aspect-3/2"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="px-4 py-2 flex justify-between items-center">
                    <span className="text-red-600 font-bold text-xl">
                      {product?.stock < 10
                        ? `Hurry Up Only ${product?.stock} left!!!`
                        : ""}
                    </span>
                    <span className="flex gap-2">
                      <span>
                        {loadingLike ? (
                          <LoaderIcon />
                        ) : (
                          <span
                            onClick={() => likeDislikeProduct(product?._id)}
                          >
                            {1 === 2 ? (
                              <FavoriteIcon sx={{ color: "red" }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </span>
                        )}
                      </span>
                      <span className="cursor-pointer">
                        <ShareOutlinedIcon />
                      </span>
                    </span>
                  </div>
                </div>
                <div className="px-4 py-2">
                  {discountDate - today > 0 ? (
                    <div>
                      <span className="bg-green-600 font-bold p-2 rounded-md text-white px-4">
                        {product?.discount.name}
                      </span>
                      <div className="flex gap-3 mt-3">
                        <span className="text-red-600 font-light text-4xl">
                          -{product?.discount.discountPercentage}%
                        </span>
                        <span className="text-5xl font-bold">
                          ₹
                          {formatPrice(
                            calculateDiscountPrice(
                              product?.price,
                              product?.discount.discountPercentage
                            )
                          )}
                        </span>
                      </div>
                      <span className="text-xl font-light">
                        M.R.P.:{" "}
                        <span className="line-through font-semibold">
                          ₹{formatPrice(product?.price)}
                        </span>
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <span className="text-5xl font-bold">
                        ₹
                        {formatPrice(
                          calculateDiscountPrice(
                            product?.price,
                            product?.discount.discountPercentage
                          )
                        )}
                      </span>
                      <span className="text-xl font-light">
                        M.R.P.:{" "}
                        <span className="line-through font-semibold">
                          ₹{formatPrice(product?.price)}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
                <span className="p-3 text-lg flex flex-col">
                  <span>Inclusive of all Taxes.</span>
                  <span>
                    Enjoy instant refunds.
                    <br />
                    Cash on Delivery Available.
                  </span>
                </span>
                <>
                  {discountDate - today > 0 ? (
                    <div className=" p-4">
                      <details className=" shadow-md bg-blue-500 rounded-md text-white">
                        <summary className=" text-2xl font-bold p-2  bg-blue-600 rounded-md  ">
                          <DiscountIcon />
                          {product?.discount.name}
                        </summary>
                        <p className=" text-xl font-semibold p-4">
                          {product?.discount.description} with{" "}
                          {product?.discount.discountPercentage} %
                        </p>
                      </details>
                    </div>
                  ) : (
                    <>
                      <span className=" p-4 bg-red-600 flex text-white font-bold text-xl">
                        No Discount Available
                      </span>
                    </>
                  )}
                </>
                <div className="p-4 ">
                  <span className="font-bold text-3xl ">
                    Total:{" "}
                    <span>
                      ₹
                      {product?.discount
                        ? `${formatPrice(
                            calculateDiscountPrice(
                              product?.price,
                              product?.discount.discountPercentage
                            )
                          )}`
                        : `${formatPrice(product?.price)}`}
                    </span>
                  </span>
                  <>
                    {userDetails?.shippingAddress.address != "" ? (
                      <div className=" text-xl font-semibold">
                        <span>
                          <LocationOnOutlinedIcon fontSize="large" />
                          Deliver to{" "}
                          <span
                            className=" text-lg text-blue-600 font-semibold underline"
                            onClick={() => navigate("/my-account")}
                          >
                            {userDetails?.name} -{" "}
                            {userDetails?.shippingAddress.city},{" "}
                            {userDetails?.shippingAddress.pincode}
                          </span>
                        </span>
                      </div>
                    ) : (
                      <div className=" text-2xl font-semibold">
                        <span>
                          {" "}
                          <LocationOnOutlinedIcon fontSize="large" />
                          Deliver to{" "}
                        </span>{" "}
                        <span
                          className=" text-blue-600 underline cursor-pointer text-xl font-bold"
                          onClick={() => navigate("/my-account")}
                        >
                          add adress now
                        </span>
                      </div>
                    )}

                    {product?.stock > 0 ? (
                      <div>
                        <span className=" text-2xl font-bold">
                          {product?.stock < 10 ? (
                            <span className=" text-orange-600 ">
                              Only {product?.stock} left , Hurry Up!!!
                            </span>
                          ) : (
                            <span className=" text-green-600">In Stock</span>
                          )}{" "}
                        </span>
                      </div>
                    ) : (
                      <span className=" text-red-600 font-semibold text-2xl mt-2">
                        Out of Stock
                      </span>
                    )}
                    
                  </>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>No Product Found</div>
      )}
    </>
  );
};

export default Product;
