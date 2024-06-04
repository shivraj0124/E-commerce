import React from "react";
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
const Navbar = () => {
  return (
    <div className=" flex justify-between font-oswald px-5 py-8">
      <div className=" text-3xl font-bold">ElectroWorld.</div>
      <div className=" ">
        <input type="text" placeholder="Search for Product..." className=" py-2"/>
      </div>
      <div className=" hidden sm:flex gap-3 items-center">
        <span><HeadsetMicOutlinedIcon fontSize="large"/></span>
        <div className=" flex flex-col">
          <span className=" text-2xl font-bold">+911234567890</span>
          <span className=" text-xs text-end">contact@electroworld.com</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
