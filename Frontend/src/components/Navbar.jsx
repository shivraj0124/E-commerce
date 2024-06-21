import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DensityMediumOutlinedIcon from "@mui/icons-material/DensityMediumOutlined";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ openmodal }) => {
  const location = useLocation();
  return (
    <div className=" flex min-w-screen max-w-full bg-blue-600 text-white text-xs sm:text-xl py-4 sm:py-0 px-3 sm:px-10 justify-between">
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
            className={` hover:bg-blue-700 inline-block py-4 h-full px-4 cursor-pointer ${
              location.pathname === "/" ? "bg-blue-700" : "bg-blue-600"
            }`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={` hover:bg-blue-700 inline-block py-4 h-full px-4 cursor-pointer ${
              location.pathname === "/offers" ? "bg-blue-700" : "bg-blue-600"
            }`}
            to="/offers"
          >
            Offers
          </Link>
          <Link
            className={` hover:bg-blue-700 inline-block py-4 h-full px-4 cursor-pointer ${
              location.pathname === "/buy-again" ? "bg-blue-700" : "bg-blue-600"
            }`}
            to="/buy-again"
          >
            Buy Again
          </Link>
        </div>
      </div>
      <div className=" flex items-center gap-3 mr-3">
        <Link to="/favourites" className=" hidden sm:flex cursor-pointer ">
          <FavoriteBorderIcon />
        </Link>

        <Link to="/cart" className="cursor-pointer flex">
          <ShoppingCartOutlinedIcon />
        </Link>

        <Link to="my-account" className="cursor-pointer flex">
          <PersonOutlineOutlinedIcon />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
