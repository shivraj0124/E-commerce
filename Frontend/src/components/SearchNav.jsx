import React, { useState, useEffect } from "react";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
const SearchNav = ({ category, setCategory, searchTerm, setSearchTerm }) => {
  const [tempCategory, setTempCategory] = useState(category);
  const [tempSearchTerm, setTempSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  const showSearch = () => {
    if (tempSearchTerm.trim()) {
      const queryParams = new URLSearchParams({
        category,
        searchTerm,
      }).toString();
      setCategory(tempCategory);
      setSearchTerm(tempSearchTerm);
      // console.log("temp" + tempSearchTerm);
      // console.log("final" + searchTerm);
      navigate(`/search?${queryParams}`);
      // sendSearch();
    }
  };
  const handleSearch = (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      showSearch();
    }
  };
  return (
    <div className=" flex sm:justify-between  justify-center font-oswald px-5 sm:py-8 py-5">
      <Link
        className=" sm:text-3xl  text-md font-bold hidden sm:inline-block"
        to={"/"}
      >
        ElectroWorld.
      </Link>
      <div className=" flex items-center justify-center">
        <div className=" flex rounded border border-gray-300 overlflow-hidden  px-3  gap-4">
          <select
            name=""
            id=""
            className=" p-2 border-r border-gray-300 font-bold outline-none sm:flex hidden"
            // value={category}
            onChange={(e) => setTempCategory(e.target.value)}
          >
            <option>All Category</option>
            <option>Laptops</option>
            <option>Mobile Phones</option>
            <option>Headphones</option>
            <option>Camera & Gears</option>
            <option>Powerbanks & Chargers</option>
          </select>
          <input
            type="text"
            id="searchbox"
            placeholder="Search for Product..."
            className=" p-2 sm:w-80 outline-none w-60"
            // value={searchTerm}
            onChange={(e) => setTempSearchTerm(e.target.value)}
            onKeyDown={(e) => handleSearch(e)}
          />
          <button
            className=" text-slate-500 p-2 hover:text-blue-600"
            onClick={showSearch}
          >
            <SearchIcon />
          </button>
        </div>
      </div>
      <div className=" hidden sm:flex gap-3 items-center mr-2">
        <span>
          <HeadsetMicOutlinedIcon fontSize="large" />
        </span>
        <div className=" flex flex-col">
          <span className=" text-2xl font-bold">+911234567890</span>
          <span className=" text-xs text-end">contact@electroworld.com</span>
        </div>
      </div>
    </div>
  );
};

export default SearchNav;
