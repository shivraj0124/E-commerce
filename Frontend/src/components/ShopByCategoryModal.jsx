import React, { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AuthContext } from "./Context/AuthContext.jsx";
import Cookies from "js-cookie";
import axios from "axios";
import { ProductContext } from "./Context/ProductContext.jsx";

const ShopByCategoryModal = ({ open, close, home }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRoot = document.getElementById("portal");
  const [productsLoading, setProductsLoading] = useState(false);
  const navigate = useNavigate();
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

  const { setProductsByCategory } = useContext(ProductContext);
  useEffect(() => {
    getAllCategories();
    if (open) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [open]);
  const { isLogin, setIsLogin, userDetails, setToken } =
    useContext(AuthContext);
  const [categories, setCategories] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);
  if (!open && !isVisible) return null;

  const removeAccount = () => {
    setIsLogin(false);
    setToken(undefined);
    Cookies.remove("token");
    close();
  };

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
      close;
      setProductsLoading(false);
    }
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-start z-10">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          open ? "opacity-45" : "opacity-0"
        }`}
        onClick={close}
      ></div>
      <div
        className={
          theme === "dark"
            ? `bg-blue-800 h-screen flex absolute text-white w-4/5 sm:w-1/5 transform transition-transform duration-300    ${
                open ? "translate-x-0" : "-translate-x-full"
              }`
            : `bg-blue-600 h-screen flex absolute text-white w-4/5 sm:w-1/5 transform transition-transform duration-300    ${
                open ? "translate-x-0" : "-translate-x-full"
              }`
        }
      >
        <div className="  w-full">
          <div
            className={
              theme === "dark"
                ? "w-full flex justify-between bg-blue-900 p-4"
                : "w-full flex justify-between bg-blue-700 p-4"
            }
          >
            <Link
              className=" text-3xl font-bold cursor-pointer"
              onClick={close}
              to={"/"}
            >
              ElectroWorld
            </Link>
            <button onClick={close}>
              <CloseOutlinedIcon />
            </button>
          </div>

          <div className=" overflow-y-auto h-full">
            <div className="pt-4">
              <span className=" text-lg sm:text-xl font-bold p-3">
                Trendings
              </span>
              <div className="flex flex-col mt-1">
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  New Releases
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Best Sellers
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  User's Choice
                </span>
              </div>
            </div>
            <hr className=" border-blue-800" />
            <div className="pt-4">
              <span className=" text-lg sm:text-xl font-bold p-3">
                Categories
              </span>
              <div className="flex flex-col mt-1">
                {categories.map((category, index) => (
                  <span
                    className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5 "
                    key={index}
                    onClick={() => {
                      openCategoryPage(category._id);
                    }}
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            </div>
            <hr className=" border-blue-800" />
            <div className="pt-4">
              <span className=" text-lg sm:text-xl font-bold p-3">
                Help & Account
              </span>
              <div className="flex flex-col mt-1">
                <span
                  className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5 flex items-center gap-2 "
                  onClick={toggleTheme}
                >
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                  {theme === "dark" ? (
                    <LightModeIcon className=" hover:text-yellow-400" />
                  ) : (
                    <DarkModeIcon className=" hover:text-purple-600" />
                  )}
                </span>
                <Link
                  className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5"
                  to={isLogin ? "/my-account" : "/auth"}
                  onClick={close}
                >
                  {isLogin ? "My account" : "Login"}
                </Link>
                <span
                  onClick={removeAccount}
                  className={
                    isLogin
                      ? " hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5"
                      : " hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5 hidden"
                  }
                >
                  Sign Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ShopByCategoryModal;
