import React, { useContext, useState } from "react";

import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../Context/ThemeContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { ProductContext } from "../Context/ProductContext";

const SearchFilter = ({isSortOption, toggleSortOption, filtersOption, toggleFilterOption}) => {
//   const [filtersOption, showFiltersOption] = useState(false);
//   const [sortOption, showSortOption] = useState(false);
  const { searchTerm, searchCategory } = useContext(ProductContext);

//   const toggleFiterOption = () => {
//     showFiltersOption(!filtersOption);
//     showSortOption(false);
//   };
//   const toggleSortOption = () => {
//     showSortOption(!sortOption);

//     showFiltersOption(false);
//   };
  const valuetext = (value) => {
    return `${value} $`;
  };
  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { theme } = useContext(ThemeContext);
  const handleMinInputChange = (event) => {
    const newValue = [Number(event.target.value), value[1]];
    setValue(newValue);
  };

  const handleMaxInputChange = (event) => {
    const newValue = [value[0], Number(event.target.value)];
    setValue(newValue);
  };
  const [is4StarAbove, setIs4StarAbove] = useState(false);
  const [is3StarAbove, setIs3StarAbove] = useState(false);

  const handle3StarBox = () => {
    setIs3StarAbove(!is3StarAbove);
  };
  const handle4StarBox = () => {
    setIs4StarAbove(!is4StarAbove);
  };

  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);
  const handleBrandName = (e) => {
    setBrandName(e.target.value);
  };

  const brandNames = [
    "Apple",
    "Samsung",
    "Xiomi",
    "Nokia",
    "Poco",
    "IQOO",
    "Realme",
    "Mi",
  ];
  const updateBrandsList = (e) => {
    const { value, checked } = e.target;

    setBrandList((prevList) =>
      checked
        ? [...prevList, value]
        : prevList.filter((brand) => brand !== value)
    );
  };
  return (
    <>
    <div className=" flex justify-between px-3 py-1 sm:hidden w-full gap-2 h-full dark:bg-slate-800">
        <button
          className={
            filtersOption === false
              ? " bg-white w-1/2 h-10 rounded-md  "
              : " bg-blue-600 w-1/2 h-10 rounded-md   text-white"
          }
          onClick={toggleFilterOption}
        >
          Filters
        </button>
        <button
          className={
            !isSortOption
              ? " bg-white w-1/2 h-10 rounded-md  "
              : " bg-blue-600 w-1/2 h-10 rounded-md   text-white"
          }
          onClick={toggleSortOption}
        >
          Sort
        </button>
      </div>
      <div
      className={
        filtersOption
          ? " sm:w-80 pl-6  py-6  border-4 dark:border-gray-700 shadow-xl bg-white pr-6 dark:bg-slate-800"
          : " sm:w-80 pl-6  py-6  border-4 dark:border-gray-700  shadow-xl bg-white pr-6 hidden sm:flex flex-col dark:bg-slate-800"
      }
    >
      <span className=" flex flex-col gap-1">
        <span className=" text-xl font-bold ">Categories</span>
        <span className=" font-semibold text-md ">{searchCategory.name}</span>
      </span>
      <div className=" flex flex-col gap-4 ">
        <div className="mt-8">
          <span className=" text-xl font-bold  ">Price Range</span>
          <span className=" flex flex-col dark:text-white ">
            <Box sx={{ width: 250 }}>
              <Slider
                getAriaLabel={() => "Price Range"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Box>
            <div className=" flex w-full gap-2 z-0">
              <TextField
                id="outlined-number"
                label="Min"
                type="number"
                inputProps={{
                  style: {
                    outlineColor: theme === "dark" ? "white" : "black",
                    color: theme === "dark" ? "white" : "black",
                    borderColor: theme === "dark" ? "white" : "black",
                  },
                }}
                size="small"
                onChange={handleMinInputChange}
                value={value[0]}
                
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: theme === "dark" ? "white" : "black",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                  },
                }}
              />
              <TextField
                id="outlined-number"
                label="Max"
                type="number"
                inputProps={{
                  style: {
                    outlineColor: theme === "dark" ? "white" : "black",
                    color: theme === "dark" ? "white" : "black",
                    borderColor: theme === "dark" ? "white" : "black",
                  },
                }}
                size="small"
                onChange={handleMaxInputChange}
                value={value[1]}
                InputLabelProps={{
                  shrink: true,
                  style: {
                    color: theme === "dark" ? "white" : "black",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "&:hover fieldset": {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: theme === "dark" ? "white" : "black",
                    },
                  },
                }}
              />
            </div>
          </span>
        </div>

        <div className=" flex flex-col ">
          <span className=" text-xl font-bold ">Customer Ratings</span>
          <span className=" flex gap-2 text-center items-center">
            <input
              type="checkbox"
              name=""
              id=""
              value={is4StarAbove}
              onChange={handle4StarBox}
            />
            4 Stars & Above
          </span>
          <span className=" flex gap-2 text-center items-center">
            <input
              type="checkbox"
              name=""
              id=""
              value={is3StarAbove}
              onChange={handle3StarBox}
            />
            3 Stars & Above
          </span>
        </div>
        <div> {/* <span className=" text-xl font-bold "></span> */}</div>
        <div>
          <span className=" text-xl font-bold ">Brands</span>
          <div>
            <div>
              <input
                type="search"
                name=""
                id=""
                value={brandName}
                onChange={handleBrandName}
                placeholder="Search Brand"
                className=" outline-none border-b border-black dark:border-white bg-transparent font-bold mt-1"
              />
              <button className=" text-slate-500 hover:text-blue-600 ">
                <SearchIcon />
              </button>
              <div className=" flex flex-col mt-2">
                {brandNames.map((name, index) => (
                  <span className=" flex gap-2">
                    <input
                      type="checkbox"
                      key={index}
                      value={name}
                      onChange={(e) => updateBrandsList(e)}
                    />
                    <span>{name}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
};

export default SearchFilter;
