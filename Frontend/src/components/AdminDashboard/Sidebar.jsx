import React from "react";
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowDown } from "react-icons/io";
import { useLocation } from "react-router-dom";
import MenuOpenSharpIcon from '@mui/icons-material/MenuOpenSharp';
import ArrowForwardIosTwoToneIcon from '@mui/icons-material/ArrowForwardIosTwoTone';
import adminHook from "../Context/AdminContext";
import { BsCart4 } from "react-icons/bs";
import { RiFileList3Line } from "react-icons/ri";
import { LuWallet } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import { PiFolderUserBold } from "react-icons/pi";
function Sidebar() {
  const { isOpenSidebar,setIsOpenSidebar}=adminHook()
  const location = useLocation();
  const locationPath = location.pathname;
  console.log(location, "locationnnn");
  return (
    <div className="h-full  border-r bg-white">
      <div className="p-2 border-b"> 
        <span className="font-bold text-3xl text-blue-500">
          E-<span className="text-black">Store</span>
        </span>
      </div>

      <div className="h-[92vh] overflow-y-auto p-2 px-5  text-black">
        <div className="flex flex-col gap-2">
          <div
            className={`flex justify-between items-center px-3 py-2 ${
              locationPath === "/admin/dashboard"
                ? "bg-blue-300 bg-opacity-25 text-blue-600"
                : ""
            } hover:bg-blue-300 hover:bg-opacity-25 hover:text-blue-600 font-semibold cursor-pointer rounded-md`}
          >
            <div className="flex items-center gap-2">
              <RxDashboard size={20} />
              <span className="text-lg">Dashboard</span>
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-3 py-2 ${
              locationPath === "/admin/products"
                ? "bg-blue-300 bg-opacity-25 text-blue-600"
                : ""
            } hover:bg-blue-300 hover:bg-opacity-25 hover:text-blue-600 font-semibold cursor-pointer rounded-md`}
          >
            <div className="flex items-center gap-2">
              <BsCart4 size={20} />
              <span className="text-lg">Products</span>
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-3 py-2 ${
              locationPath === "/admin/orders"
                ? "bg-blue-300 bg-opacity-25 text-blue-600"
                : ""
            } hover:bg-blue-300 hover:bg-opacity-25 hover:text-blue-600 font-semibold cursor-pointer rounded-md`}
          >
            <div className="flex items-center gap-2">
              <RiFileList3Line size={20} />
              <span className="text-lg">Orders</span>
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-3 py-2 ${
              locationPath === "/admin/orders"
                ? "bg-blue-300 bg-opacity-25 text-blue-600"
                : ""
            } hover:bg-blue-300 hover:bg-opacity-25 hover:text-blue-600 font-semibold cursor-pointer rounded-md`}
          >
            <div className="flex items-center gap-2">
              <LuWallet size={20} />
              <span className="text-lg">Sales</span>
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-3 py-2 ${
              locationPath === "/admin/orders"
                ? "bg-blue-300 bg-opacity-25 text-blue-600"
                : ""
            } hover:bg-blue-300 hover:bg-opacity-25 hover:text-blue-600 font-semibold cursor-pointer rounded-md`}
          >
            <div className="flex items-center gap-2">
              <FaRegUser size={20} />
              <span className="text-lg">Users</span>
            </div>
          </div>

          <div
            className={`flex justify-between items-center px-3 py-2 ${
              locationPath === "/admin/orders"
                ? "bg-blue-300 bg-opacity-25 text-blue-600"
                : ""
            } hover:bg-blue-300 hover:bg-opacity-25 hover:text-blue-600 font-semibold cursor-pointer rounded-md`}
          >
            <div className="flex items-center gap-2">
              <PiFolderUserBold size={20} />
              <span className="text-lg">Seller</span>
            </div>
          </div>
         


        </div>
      </div>
    </div>
  );
}

export default Sidebar;
