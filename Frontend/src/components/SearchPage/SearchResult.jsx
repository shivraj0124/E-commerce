import React from "react";

const SearchResult = () => {
  return (
    <>
      <div className="h-full md:flex bg-white dark:bg-[#121212] rounded-md w-full justify-between shadow-md hidden cursor-pointer px-12 py-6 ">
        <div className="relative h-52  w-1/6"> 
          <img
            src="https://switch.com.ph/cdn/shop/files/ROSA_Apple_Watch_Ultra_2_LTE_49mm_Titanium_Blue_Black_Trail_Loop_PDP_Image_Position-1.jpg?v=1698388489&width=1000"
            className="absolute inset-0 h-full w-full object-cover "
            alt="product image"
          />
        </div>
        <div>Product Desc</div>
        <div>Price & Buy Button</div>
      </div>
      <div className="h-full sm:hidden bg-white dark:bg-[#121212] rounded-md w-full justify-between shadow-md flex px-2 py-5">
        <div className="relative h-32 w-1/3"> 
          <img
            src="https://switch.com.ph/cdn/shop/files/ROSA_Apple_Watch_Ultra_2_LTE_49mm_Titanium_Blue_Black_Trail_Loop_PDP_Image_Position-1.jpg?v=1698388489&width=1000"
            alt="product image"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div>
          <div>product info</div>
          <div>Buy Button</div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
