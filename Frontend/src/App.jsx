import React, { useState } from "react";
import { SearchNav, Navbar, ShopByCategoryModal } from "./components/index";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import {
  Offers,
  Home,
  BuyAgain,
  AboutUser,
  Cart,
  UserFavourite,
  Search,
} from "./pages/index";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonIcon from "@mui/icons-material/Person";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Category");

  return (
    <BrowserRouter>
      <div className="">
        <div className="flex px-7 py-2 justify-center sm:justify-between bg-slate-100 text-gray-500 text-sm font-normal">
          <span>WELCOME TO ELECTRO STORE</span>
          <div className="sm:flex gap-4 hidden">
            <span className="cursor-pointer hover:text-blue-600">
              <LocationOnOutlinedIcon /> Store Locator
            </span>
            <span className="cursor-pointer hover:text-blue-600">
              <LocalShippingOutlinedIcon /> Free Shipping & Returns
            </span>
            <span className="cursor-pointer hover:text-blue-600">
              <Link to={"/my-account"}>
                <PersonIcon /> My Account
              </Link>
            </span>
          </div>
        </div>
        <SearchNav
          category={category}
          searchTerm={searchTerm}
          setCategory={setCategory}
          setSearchTerm={setSearchTerm}
        />
        <Navbar openmodal={handleModal} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/buy-again" element={<BuyAgain />} />
          <Route path="/my-account" element={<AboutUser />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<UserFavourite />} />
          <Route
            path="/search"
            element={<Search category={category} keyword={searchTerm} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <ShopByCategoryModal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
      />
    </BrowserRouter>
  );
};

export default App;
