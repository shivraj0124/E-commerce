import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../Components/Context/ProductContext";
import Rating from "@mui/material/Rating";
import { Swiper, SwiperSlide } from "swiper/react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
import { FavoriteOutlined } from "@mui/icons-material";
const Product = () => {
  const { userDetails } = useContext(ProductContext);
  const [productLoading, setProductLoading] = useState(false);
  const [product, setproduct] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation();

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
        setproduct(response.data.product[0]);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
    setProductLoading(false);
  };
  useEffect(() => {
    openProductPage();
  }, []);
  console.log(product);
  return (
    <>
      {!error ? (
        <div>
          {productLoading ? (
            <div></div>
          ) : (
            <div>
              <div className=" hidden sm:md:flex dark:bg-[#121212] bg-slate-200">
                <Swiper
                  navigation={true}
                  modules={[Navigation]}
                  className="  h-1/4 w-1/2"
                >
                  {product?.images.map((image, index) => {
                    return (
                      <SwiperSlide key={index} className=" h-52 w-1/6  ">
                        <img
                          src={image}
                          alt="image"
                          className=" inset-0 h-full w-full object-contain rounded-md aspect-3/2 text-white"
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
              <div className=" flex flex-col sm:md:hidden dark:bg-[#121212] bg-slate-200  ">
                <div className=" flex flex-col ">
                  <span className=" flex justify-between w-screen p-2">
                    <span className=" text-xl font-semibold">Seller Name</span>
                    <span className=" text-xl font-bold items-center flex gap-2">
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
                      <span className=" text-blue-400">
                        {product?.numReviews}
                      </span>
                    </span>
                  </span>
                  <span className=" text-2xl font-bold p-3">
                    {product?.name} from{" "}
                    <span className=" font-semibold underline">
                      {product?.brand}
                    </span>
                  </span>
                </div>
                <div className=" mt-1  rounded-md ">
                  <Swiper
                    navigation={true}
                    modules={[Navigation]}
                    className="  h-2/3 w-2/3 "
                  >
                    {product?.images.map((image, index) => {
                      return (
                        <SwiperSlide key={index} className=" h- w-1/3  b">
                          <img
                            src={image}
                            alt="image"
                            className=" inset-0 h-full w-full object-contain rounded-md aspect-3/2 text-white"
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className=" px-4 py-2 flex justify-between items-center ">
                    <span className=" text-red-600 font-bold  text-xl">
                      {product?.stock < 10
                        ? `Hurry Up Only ${product?.stock} left!!!`
                        : ""}
                    </span>
                    <span className=" flex gap-2 ">
                      <span>
                        {1 === 2 ? (
                          <FavoriteIcon sx={{ color: "red" }} />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </span>
                      <span className=" cursor-pointer">
                        <ShareOutlinedIcon />
                      </span>
                    </span>
                  </div>
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
