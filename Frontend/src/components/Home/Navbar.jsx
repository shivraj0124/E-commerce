import React, { useContext, useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../Context/ThemeContext.jsx";
import { AuthContext } from "../Context/AuthContext.jsx";
import Badge from "@mui/material/Badge";

const Navbar = ({ openmodal }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLogin, token, userDetails } = useContext(AuthContext);

  return (
    <div className=" flex w-screen  bg-blue-600 text-white text-xs sm:text-xl py-4 sm:py-0 px-3 sm:px-10 justify-between dark:bg-blue-700">
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
          className=" hidden sm:flex cursor-pointer"
          data-tooltip-id="my-account-tooltip"
          data-tooltip-content="Favorites"
        >
          {userDetails ? (
            <Badge badgeContent={userDetails.likes.length} color="error">
              <FavoriteBorderIcon />
            </Badge>
          ) : (
            <FavoriteBorderIcon />
          )}
        </Link>

        <Link
          to="/cart"
          className="cursor-pointer flex"
          data-tooltip-id="my-account-tooltip"
          data-tooltip-content="Cart"
        >
          {userDetails ? (
            <Badge badgeContent={userDetails.cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          ) : (
            <ShoppingCartOutlinedIcon />
          )}
        </Link>

        <Link
          to={isLogin ? "/my-account" : "/auth/login"}
          className="cursor-pointer flex"
          data-tooltip-id="my-account-tooltip"
          data-tooltip-content={isLogin ? "My Account" : "Login / Sign up"}
        >
          <PersonOutlineOutlinedIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
