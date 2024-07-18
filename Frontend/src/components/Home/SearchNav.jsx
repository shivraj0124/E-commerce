import React, { useState, useEffect, useContext } from "react";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ProductContext } from "../Context/ProductContext";
const SearchNav = () => {
  const navigate = useNavigate();
const { setSearchTerm, setSearchCategory } = useContext(ProductContext);
const [searchedTerm, setSearchedTerm] = useState();
const [searchedCategory, setSearchedCategory] = useState({})
  const showSearch = () => {
    setSearchCategory(searchedCategory)
setSearchTerm(searchedTerm)
    navigate(`/search`);
  };
  const handleSearch = (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      showSearch();
    }
  };
  const [categories, setCategories] = useState([]);
  const getCartegoris = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/getAllCategories`
      );
      setCategories(response.data.categories);
      
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(()=>{
    getCartegoris()
  },[])
  
  
  return (
    <div className=" flex sm:justify-between  justify-center font-oswald px-5 sm:py-8 py-5">
      <Link
        className=" sm:text-3xl  text-md font-bold hidden sm:inline-block"
        to={"/"}
      >
        ElectroWorld.
      </Link>
      <div className=" flex items-center justify-center">
        <div className=" flex rounded border-2 border-gray-300 ">
          <select
            name=""
            id=""
            className=" p-2 border-r border-gray-300 font-bold outline-none sm:flex px-3 w-20 sm:w-1/2 text-xs sm:text-base"
            // value={category}
            onChange={(e) => {
              const selectedCategory = categories.find(
                (cat) => cat._id === e.target.value
              );
              if (selectedCategory) {
                setSearchedCategory({
                  name: selectedCategory.name,
                  id: e.target.value,
                });
                console.log(selectedCategory.name);
              }
            }}
          >
            {categories &&
              categories?.map((category, index) => {
                return (
                  <option key={index} value={category._id} name={category.name}>
                    {category.name}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            id="searchbox"
            placeholder="Search for Product..."
            className=" px-4 sm:w-80 outline-none w-40 placeholder:text-xs"
            // value={searchTerm}
            onChange={(e) => setSearchedTerm(e.target.value)}
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
