import React from "react";
import { DiscountBanner } from "../Components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import TvIcon from "@mui/icons-material/Tv";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PowerIcon from "@mui/icons-material/Power";
import img1 from "../Images/iphonediscount.png"
const Home = () => {
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
      <div className=" px-8 bg-slate-100 md:flex flex-col max-h-[1/16] hidden">
        <Slider {...sliderSetting} className="">
          <DiscountBanner
          
            discountName={Discount1.name}
            discountDate={Discount1.date}
            productImage={Discount1.image}
            productPrice={Discount1.price}
            productDesc={Discount1.desc}
          />
          <DiscountBanner
            discountName={Discount2.name}
            discountDate={Discount2.date}
            productImage={Discount2.image}
            productPrice={Discount2.price}
            productDesc={Discount2.desc}
          />
        </Slider>
      </div>
      
      <div className=" bg-slate-100 flex flex-col md:hidden">
        <Slider {...sliderSetting} className="">
          <DiscountBanner
          
            discountName={Discount1.name}
            discountDate={Discount1.date}
            productImage={Discount1.image}
            productPrice={Discount1.price}
            productDesc={Discount1.desc}
          />
          <DiscountBanner
            discountName={Discount2.name}
            discountDate={Discount2.date}
            productImage={Discount2.image}
            productPrice={Discount2.price}
            productDesc={Discount2.desc}
          />
        </Slider>
      </div>

      <div className=" flex  w-screen justify-between px-6 py-4 text-sm sm:text-lg font-light ">
        <span className=" flex flex-col justify-center text-center items-center cursor-pointer">
          <PhoneIphoneIcon fontSize="large"/>
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
