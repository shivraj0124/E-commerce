import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonIcon from "@mui/icons-material/Person";
const TopNav = () => {
  return (
    <div className=" flex px-7 py-2 justify-center sm:justify-between bg-slate-100 text-gray-500 text-sm font-normal">
      <span className="">WELCOME TO ELECTRO STORE</span>
      <div className=" sm:flex gap-4 hidden ">
        <span className=" cursor-pointer hover:text-blue-600">
          <LocationOnOutlinedIcon /> Store Locator
        </span>
        <span className=" cursor-pointer hover:text-blue-600">
          <LocalShippingOutlinedIcon /> Free Shipping & Returns
        </span>
        <span className=" cursor-pointer hover:text-blue-600">
          <PersonIcon /> My Account
        </span>
      </div>
    </div>
  );
};

export default TopNav;
