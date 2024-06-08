import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
const ShopByCategoryModal = ({ open, close }) => {
  const [isVisible, setIsVisible] = useState(false);
  const modalRoot = document.getElementById("portal");

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      setTimeout(() => {
        setIsVisible(false);
      }, 300);
    }
  }, [open]);

  if (!open && !isVisible) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex justify-start">
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          open ? "opacity-45" : "opacity-0"
        }`}
        onClick={close}
      ></div>
      <div
        className={`bg-blue-600 h-screen flex absolute text-white w-4/5 sm:w-1/5 transform transition-transform duration-300    ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="  w-full">
          <div className="w-full flex justify-between bg-blue-700 p-4">
            <span className=" text-3xl font-bold">ElectroWorld</span>
            <button onClick={close}>
              <CloseOutlinedIcon />
            </button>
          </div>

          <div className=" overflow-y-auto h-full">
            <div className="pt-4">
              <span className=" text-lg sm:text-xl font-bold p-3">
                Trendings
              </span>
              <div className="flex flex-col mt-1">
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  New Releases
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Best Sellers
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  User's Choice
                </span>
              </div>
            </div>
            <hr className=" border-blue-800" />
            <div className="pt-4">
              <span className=" text-lg sm:text-xl font-bold p-3">
                Categories
              </span>
              <div className="flex flex-col mt-1">
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Mobile Phones
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Laptop & Computers
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Powerbank & Adapters
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Camera & Gears
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Others
                </span>
              </div>
            </div>
            <hr className=" border-blue-800" />
            <div className="pt-4">
              <span className=" text-lg sm:text-xl font-bold p-3">
                Help & Account
              </span>
              <div className="flex flex-col mt-1">
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Your Account
                </span>
                <span className=" hover:bg-blue-700 cursor-pointer text-md sm:text-lg p-3 px-5">
                  Sign Out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default ShopByCategoryModal;
