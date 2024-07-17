import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import {
  SearchNav,
  Navbar,
  ShopByCategoryModal,
  LoginBox,
  UserSignupBox,
  SellerSignupBox,
  TopNav,
} from "./index.js";
const TopLayout = () => {
  const isAuth = location.pathname.startsWith("/auth");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Category");
  return (
    <div>
      {!isAuth && (
        <>
          <TopNav />
          <SearchNav
            category={category}
            searchTerm={searchTerm}
            setCategory={setCategory}
            setSearchTerm={setSearchTerm}
          />
          <Tooltip id="my-account-tooltip" />
          <Navbar openmodal={handleModal} />
        </>
      )}
      <Outlet />
    </div>
  );
};

export default TopLayout;
