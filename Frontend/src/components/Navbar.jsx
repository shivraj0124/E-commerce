import React, { useContext, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";

const Navbar = ({ openmodal }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isUserLogin, setIsUserLogin] = useState(false);
  return (
    <div className=" flex min-w-screen max-w-full bg-blue-600 text-white text-xs sm:text-xl py-4 sm:py-0 px-3 sm:px-10 justify-between dark:bg-blue-700">
      <div className=" flex gap-7 items-center">
        <div className=" flex gap-2 items-center">
          <span
            className=" cursor-pointer items-center flex"
            onClick={openmodal}
          >
            <DensityMediumOutlinedIcon />
          </span>
          Shop By Categories
        </div>
        <div className=" hidden sm:flex gap-3 h-full">
          <Link
            className={` hover:bg-blue-700 inline-block py-4 h-full px-4 cursor-pointer  hover:dark:bg-blue-800 ${
              location.pathname === "/"
                ? "bg-blue-700 dark:bg-blue-800"
                : "bg-blue-600 dark:bg-blue-700"
            }`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={` hover:bg-blue-700 inline-block py-4 h-full px-4 cursor-pointer  hover:dark:bg-blue-800 ${
              location.pathname === "/offers"
                ? "bg-blue-700 dark:bg-blue-800"
                : "bg-blue-600 dark:bg-blue-700"
            }`}
            to="/offers"
          >
            Offers
          </Link>
          <Link
            className={` hover:bg-blue-700 inline-block py-4 h-full px-4 cursor-pointer  hover:dark:bg-blue-800 ${
              location.pathname === "/buy-again"
                ? "bg-blue-700 dark:bg-blue-800"
                : "bg-blue-600 dark:bg-blue-700"
            }`}
            to="/buy-again"
          >
            Buy Again
          </Link>
        </div>
      </div>
      <div className=" flex items-center gap-3 mr-3">
        <Link
          to="/favourites"
          className=" hidden sm:flex cursor-pointer "
          data-tooltip-id="my-account-tooltip"
          data-tooltip-content="Favorites"
        >
          <FavoriteBorderIcon />
        </Link>

        <Link
          to="/cart"
          className="cursor-pointer flex"
          data-tooltip-id="my-account-tooltip"
          data-tooltip-content="Cart"
        >
          <ShoppingCartOutlinedIcon />
        </Link>

        <Link
          to={isUserLogin ? "/my-account" : "/auth/login"}
          className="cursor-pointer flex"
          data-tooltip-id="my-account-tooltip"
          data-tooltip-content={isUserLogin ? "My Account" : "Login / Sign up"}
        >
          <PersonOutlineOutlinedIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
