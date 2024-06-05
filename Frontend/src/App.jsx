import React from "react";
import { SearchNav, Navbar } from "./components/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Offers,
  Home,
  BuyAgain,
  AboutUser,
  Cart,
  UserFavourite,
} from "./pages/index";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonIcon from "@mui/icons-material/Person";
const App = () => {
  return (
    <BrowserRouter>
      <div className="">
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
        <SearchNav />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/buy-again" element={<BuyAgain />} />
          <Route path="/about-user" element={<AboutUser />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/user-favourite" element={<UserFavourite />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
