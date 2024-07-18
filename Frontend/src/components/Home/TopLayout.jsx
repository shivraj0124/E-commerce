import React, { useState } from "react";

import { Outlet } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import SearchNav from "./SearchNav";
import ShopByCategoryModal from "../ShopByCategoryModal"
import DiscountBanner from "./DiscountBanner";
import Navbar from "./Navbar"
import TopNav from './TopNav'
const TopLayout = () => {
  const isAuth = location.pathname.startsWith("/auth");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };
 
  const setHome = () => {
    return <Navigate to="/" />;
  };
  return (
    <div>
      {!isAuth && (
        <>
          <TopNav />
          <SearchNav
            
          />
          <Tooltip id="my-account-tooltip" />
          <Navbar openmodal={handleModal} />
        </>
      )}
      <Outlet />
      <ShopByCategoryModal
        open={isModalOpen}
        close={() => setIsModalOpen(false)}
        home={setHome}
      />
    </div>
  );
};

export default TopLayout;
