import React, { useContext, useEffect, useState } from "react";
import DiscountBanner from "../Components/Home/DiscountBanner.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import TvIcon from "@mui/icons-material/Tv";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PowerIcon from "@mui/icons-material/Power";
import { AuthContext } from "../Components/Context/AuthContext.jsx";
import axios from "axios";

const Home = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const getAllDiscounts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/discount/getAllDiscounts`
      );
      return response.data.discounts;
    } catch (error) {
      return error;
    }
  };

  const getDiscountedProducts = async () => {
    try {
      const discounts = await getAllDiscounts();

      // console.log("discounts are ", discounts);
      const productRequests = discounts.map((discount) =>
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/product/getSingleProduct/${discount.products._id}`
        )
      );
      const productResponse = await Promise.all(productRequests);
      // console.log("products response is ", productResponse);
      const products = productResponse.map((response) => response.data.product);
      setDiscountedProducts(products);
    } catch (error) {
      console.log("Error Got while Fetching Discounts", error);
    }
  };
  useEffect(() => {
    getDiscountedProducts();
  }, []);
  console.log(discountedProducts);
  const Discount1 = {
    name: "Buy One Get One",
    image:
      "https://switch.com.ph/cdn/shop/files/ROSA_Apple_Watch_Ultra_2_LTE_49mm_Titanium_Blue_Black_Trail_Loop_PDP_Image_Position-1.jpg?v=1698388489&width=1000",
    date: "2024-07-21",
    price: 13,
    desc: "Apple Watch series 6",
  };
  const Discount2 = {
    name: "50% Off on all iphones",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MT233?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1693248327138",
    date: "2024-07-30",
    price: 19.5,
    desc: "Iphone 13 pro max",
  };
  const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,

    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      <div className=" px-8 bg-slate-100 md:flex flex-col max-h-[1/16] hidden ">
        {discountedProducts && (
          <Slider {...sliderSetting} className="" swipe={true}>
            {discountedProducts.map((productArray, index) => {
              const product = productArray[0];
              return (
                <DiscountBanner
                  key={product._id}
                  discountName={product.name}
                  productImage={product.images[0]}
                  discountDate={product.discount.name}
                  productPrice={product.price}
                  MRP={product.price}
                />
              );
            })}
          </Slider>
        )}
      </div>

      <div className=" bg-slate-100 flex flex-col md:hidden ">
        {discountedProducts && (
          <Slider {...sliderSetting} className="" swipe={true}>
            {discountedProducts.map((productArray, index) => {
              const product = productArray[0];

              return (
                <DiscountBanner
                  key={product._id}
                  discountName={product.name}
                  productImage={product.images[0]}
                  discountDate={product.discount.name}
                  productPrice={product.price}
                  MRP={product.price}
                />
              );
            })}
          </Slider>
        )}
      </div>

      <div className=" flex  w-screen justify-between px-6 py-4 text-sm sm:text-lg font-light ">
        <span className=" flex flex-col justify-center text-center items-center cursor-pointer ">
          <PhoneIphoneIcon fontSize="large" />
          Phone
        </span>
        <span className=" flex flex-col justify-center text-center items-center gap-2 cursor-pointer">
          <TabletAndroidIcon />
          Tablet
        </span>
        <span className=" flex flex-col justify-center text-center items-center gap-2 cursor-pointer">
          <TvIcon />
          Laptops & PC
        </span>
        <span className=" flex flex-col justify-center text-center items-center gap-2 cursor-pointer">
          <CameraAltIcon />
          Camera & Gears
        </span>
        <span className=" flex flex-col justify-center text-center items-center gap-2 cursor-pointer">
          <PowerIcon />
          Chargers & Powerbank
        </span>
      </div>
    </>
  );
};

export default Home;
