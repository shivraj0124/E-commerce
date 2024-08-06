import React, { useContext, useEffect, useState } from "react";
import DiscountBanner from "../Components/Home/DiscountBanner.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import TvIcon from "@mui/icons-material/Tv";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PowerIcon from "@mui/icons-material/Power";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import { ProductContext } from "../Components/Context/ProductContext.jsx";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { setProductsByCategory } = useContext(ProductContext);
  const [productsLoading, setProductsLoading] = useState(false);
  const navigate = useNavigate();
  const categoryIcon = {
    "All Categories": <LocalGroceryStoreIcon />,
    "Mobile Phones": <PhoneIphoneIcon />,
    "Laptop & PC": <TvIcon />,
    "Camera & Gears": <CameraAltIcon />,
    "Powerbanks & Chargers": <PowerIcon />,
    Headphones: <HeadphonesIcon />,
    Tablets: <TabletAndroidIcon />,
  };
  const date = new Date();
  const today = date.getTime();
  const getAllDiscounts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/discount/getAllDiscounts`
      );
      const discounts = response.data.discounts;
      const validDiscounts = discounts.filter((discount) => {
        return new Date(discount.endDate).getTime() >= today;
      });
      setDiscountedProducts(validDiscounts);
    } catch (error) {
      console.error("Error fetching discounts:", error);
    }
  };

  const getAllCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getAllCategories`
      );
      if (response.data.success) {
        setCategories(response.data.categories);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAllCategories();
    getAllDiscounts();
  }, []);

  const openCategoryPage = async (categoryName) => {
    setProductsLoading(true);

    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/getAllProductsByCategory`,
        { category: categoryName }
      );

      setProductsByCategory(response.data.products);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(`/category/${categoryName.name}`);
      setProductsLoading(false);
    }
  };
  return (
    <>
      <div className="px-8 bg-slate-100 md:flex flex-col max-h-[1/16] hidden">
        <Carousel autoPlay={true} infiniteLoop={true} renderIndicator={false}>
          {discountedProducts &&
            discountedProducts.map((discount, index) => (
              <DiscountBanner
                key={index}
                productId={discount.products._id}
                discountName={discount.name}
                productImage={discount.products.images[0]}
                discountDate={discount.endDate}
                productPrice={discount.products.price}
                MRP={discount.products.price}
              />
            ))}
        </Carousel>
      </div>

      <div className="bg-slate-100 flex flex-col md:hidden">
        <Carousel autoPlay={true} infiniteLoop={true} renderIndicator={false}>
          {discountedProducts &&
            discountedProducts.map((discount, index) => (
              <DiscountBanner
                key={index}
                productId={discount.products._id}
                discountName={discount.name}
                productImage={discount.products.images[0]}
                discountDate={discount.endDate}
                productPrice={discount.products.price}
                MRP={discount.products.price}
              />
            ))}
        </Carousel>
      </div>

      <div className="flex w-screen justify-between px-6 py-4 text-xs sm:text-lg font-light">
        {categories.map((category, index) => (
          <span
            key={index}
            onClick={() => {
              openCategoryPage(category);
              console.log(category.name);
            }}
          >
            <span
              className="flex flex-col justify-center text-center items-center cursor-pointer"
              key={index}
            >
              {categoryIcon[category.name]}
              {category.name}
            </span>
          </span>
        ))}
      </div>
    </>
  );
};

export default Home;
