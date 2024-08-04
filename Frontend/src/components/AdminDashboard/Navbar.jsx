import React from "react";
import { RiAdminLine } from "react-icons/ri";
import adminHook from "../Context/AdminContext";
function Navbar() {
  const {sideBarLocation}=adminHook()
  console.log(sideBarLocation);
  return (
    <div className="w-[100%]  flex justify-between items-center px-2 py-1 h-[50px] sticky top-0 bg-white z-20  ">
      <div>
        <span className="text-black font-semibold text-xl">
          {sideBarLocation}

        </span>
      </div>
      <div className="flex justify-end items-center p-2 gap-2">
        <div className="text-black flex items-center hover:bg-opacity-25">
          <RiAdminLine />
        </div>
        <span className="text-black">Admin</span>
      </div>
    </div>
  );
}

export default Navbar;
