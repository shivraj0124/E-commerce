import React from "react";
import { DiscountBanner } from "../components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
  const Discount1 = {
    name: "Buy One Get One",
    image:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/45-nc-alum-pink-sport-loop-light-pink-s9?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693282340775",
    date: "2024-06-27",
    price: 13,
    desc: "Apple Watch series 6",
  };
  const Discount2 = {
    name: "50% Off",
    image:
      "https://www.apple.com/newsroom/images/product/iphone/geo/Apple_iPhone-13-Pro_iPhone-13-Pro-Max_GEO_09142021_inline.jpg.large.jpg",
    date: "2024-06-12",
    price: 19.5,
    desc: "Iphone 13 pro max",
  };
  const sliderSetting = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="">
      <Slider {...sliderSetting}>
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
  );
};

export default Home;
