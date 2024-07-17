import React, { useContext, useState } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import { Link } from "react-router-dom";
import { AuthContext } from "./Context/AuthContext.jsx";

const TopNav = () => {
  const  {theme, toggleTheme}= useContext(ThemeContext);
  
  const {userDetails , isLogin } = useContext(AuthContext)
  const userName = userDetails?.name
  console.log(userDetails)
  
  return (
    <div>
      <div
        className={`flex px-7 py-2 justify-center sm:justify-between  text-text text-sm font-normal flex-col sm:flex-row bg-slate-100 dark:bg-slate-800 dark:text-slate-100`}
      >
        <span className=" text-center">WELCOME TO ELECTRO STORE</span>
        <div className="sm:flex gap-4 text-xs sm:text-base hidden">
          <span onClick={toggleTheme} className=" cursor-pointer ">
            {theme === "dark" ? (
              <LightModeIcon className=" hover:text-yellow-400" />
            ) : (
              <DarkModeIcon className=" hover:text-purple-600" />
            )}
          </span>
          <span className="cursor-pointer hover:text-blue-600 ">
            <LocationOnOutlinedIcon /> Store Locator
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            <LocalShippingOutlinedIcon /> Free Shipping & Returns
          </span>
          <span className="cursor-pointer hover:text-blue-600">
            <Link to={isLogin ? "/my-account" : "/auth/login"}>
              <PersonIcon /> {isLogin ? userName : "Login"}
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
