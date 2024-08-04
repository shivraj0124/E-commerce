import React, { useEffect, useState } from "react";
import adminHook from "../../Context/AdminContext";
import { FaTruck } from "react-icons/fa";
import { MdPayments } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { TbNotes } from "react-icons/tb";
import SalesLineChart from "./SalesLineChart";
import PieChart from "./Charts/PieChart";
import {
  MdOutlineArrowCircleUp,
  MdOutlineArrowCircleDown,
} from "react-icons/md";
import TopProducts from './TopProducts'
function MainDashboard() {
  const { setSidebarLocation } = adminHook();
  useEffect(() => {
    setSidebarLocation("Dashboard");
  }, []);
  let isProfit = true;
  let isProfitByCategory = false;
  return (
    <div className=" flex flex-col gap-2 p-4">
      <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Top Boxes */}
        <div className="p-2 flex flex-col bg-white rounded-md border">
          <div className="flex justify-start items-center text-black font-semibold gap-2 border-b-2 pb-2">
            <div className="bg-gray-200 text-black p-2 rounded-md">
              <FaTruck />
            </div>
            <span>Delivery</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col p-2 border-r items-center w-[100%]">
              <span className="font-semibold text-black">250</span>
              <span>Processing</span>
            </div>
            <div className="flex flex-col p-2 border-l items-center w-[100%]">
              <span className="font-semibold text-black">120</span>
              <span>Processed</span>
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-col bg-white rounded-md border">
          <div className="flex justify-start items-center text-black font-semibold gap-2 border-b-2 pb-2">
            <div className="bg-gray-200 text-black p-2 rounded-md">
              <MdPayments />
            </div>
            <span>Payments</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col p-2 border-r items-center w-[100%]">
              <span className="font-semibold text-black">5</span>
              <span>Not yet paid</span>
            </div>
            <div className="flex flex-col p-2 border-l items-center w-[100%]">
              <span className="font-semibold text-black">120</span>
              <span>Paid</span>
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-col bg-white rounded-md border">
          <div className="flex justify-start items-center text-black font-semibold gap-2 border-b-2 pb-2">
            <div className="bg-gray-200 text-black p-2 rounded-md">
              <FaBoxOpen />
            </div>
            <span>Product</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col p-2 border-r items-center w-[100%]">
              <span className="font-semibold text-black">0</span>
              <span>All Products</span>
            </div>
            <div className="flex flex-col p-2 border-l items-center w-[100%]">
              <span className="font-semibold text-black">240</span>
              <span>Sold Out</span>
            </div>
          </div>
        </div>

        <div className="p-2 flex flex-col bg-white rounded-md border">
          <div className="flex justify-start items-center text-black font-semibold gap-2 border-b-2 pb-2">
            <div className="bg-gray-200 text-black p-2 rounded-md">
              <TbNotes />
            </div>
            <span>Response</span>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex flex-col p-2 border-r items-center w-[100%]">
              <span className="font-semibold text-black">1</span>
              <span>Cancelation</span>
            </div>
            <div className="flex flex-col p-2 border-l items-center w-[100%]">
              <span className="font-semibold text-black">2</span>
              <span>Return</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex max-lg:flex-col gap-4  rounded-md mt-2 z-10">
        <div className="w-[100%] h-[100%] gap-2 flex flex-col border bg-white rounded-md  p-4 text-black ">
          <div className="flex flex-col">
            <span className="font-semibold text-left">Selling</span>
            <div className="flex gap-3 items-center">
              <span className="font-bold text-xl"> 2478564</span>
              {isProfit ? (
                <div className="flex items-center text-green-400 font-semibold text-sm">
                  <MdOutlineArrowCircleUp size={20} />
                  <span>+{20.8}%</span>
                </div>
              ) : (
                <div className="flex items-center text-red-400 font-semibold text-sm gap-1">
                  <MdOutlineArrowCircleDown size={20} />
                  <span>-{5.8}%</span>
                </div>
              )}
            </div>
          </div>
          <SalesLineChart />
        </div>
        {/* <div className="w-[100%] flex flex-col ">
          <span>Top Products</span>
          <div className="mt-2">
            <div className="">
              <div className="border rounded-md p-1 h-[40px] w-[40px]">
                <img
                  src={
                    "data:image/jpeg;base64,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"
                  }
                />
              </div>
            </div>
          </div>
        </div> */}
        <div className="w-[100%] flex flex-col text-black border bg-white rounded-md p-4">
          <div className="flex flex-col">
            <span className="font-semibold ">Sale by Category</span>
            <div className="flex gap-3 items-center">
              <span className="font-bold text-xl"> 2478564</span>
              {isProfitByCategory ? (
                <div className="flex items-center text-green-400 font-semibold text-sm">
                  <MdOutlineArrowCircleUp size={20} />
                  <span>+{20.8}%</span>
                </div>
              ) : (
                <div className="flex items-center text-red-400 font-semibold text-sm gap-1">
                  <MdOutlineArrowCircleDown size={20} />
                  <span>-{5.8}%</span>
                </div>
              )}
            </div>
          </div>
          <PieChart />
        </div>
      </div>

     <div className="w-[100%]">
       <TopProducts />
     </div>

    </div>
  );
}

export default MainDashboard;
