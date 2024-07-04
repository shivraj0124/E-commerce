import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ category, keyword }) => {
  const valuetext = (value) => {
    return `${value} $`;
  };
  const [value, setValue] = React.useState([0, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  const [filtersOption, showFiltersOption] = useState(false);
  const [sortOption, showSortOption] = useState(false);

  const toggleFiterOption = () => {
    showFiltersOption(!filtersOption);
  };
  const toggleSortOption = () => {
    showSortOption(!sortOption);
  };
  return (
    <div className=" p-1 bg-slate-200 flex w-screen h-full gap-2 sm:flex-row flex-col">
      <div className=" flex justify-between px-3 py-1 sm:hidden w-full gap-2 h-full">
        <button
          className={
            filtersOption === false
              ? " bg-white w-1/2 h-10 rounded-md  "
              : " bg-blue-600 w-1/2 h-10 rounded-md   text-white"
          }
          onClick={toggleFiterOption}
        >
          Filters
        </button>
        <button
          className={
            sortOption === false
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
            ? " sm:w-80 pl-6  py-6  border-4 shadow-xl bg-white pr-6"
            : " sm:w-80 pl-6  py-6  border-4 shadow-xl bg-white pr-6 hidden sm:flex flex-col"
        }
      >
        <span className=" flex flex-col gap-1">
          <span className=" text-xl font-bold text-black">Categories</span>
          <span className=" text-gray-600 text-md">Mobile Phones</span>
        </span>
        <div className=" flex flex-col gap-4 ">
          <div className="mt-8">
            <span className=" text-xl font-bold text-black ">Price Range</span>
            <span className=" flex flex-col">
              <Box sx={{ width: 250 }}>
                <Slider
                  getAriaLabel={() => "Price Range"}
                  value={value}
                  onChange={handleChange}
                  valueLabelDisplay="auto"
                  getAriaValueText={valuetext}
                />
              </Box>
              <div className=" flex w-full gap-2">
                <TextField
                  id="outlined-number"
                  label="Min"
                  type="number"
                  size="small"
                  onChange={handleMinInputChange}
                  value={value[0]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="outlined-number"
                  label="Max"
                  type="number"
                  size="small"
                  onChange={handleMaxInputChange}
                  value={value[1]}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </span>
          </div>

          <div className=" flex flex-col ">
            <span className=" text-xl font-bold text-black">
              Customer Ratings
            </span>
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
          <div>
            {" "}
            <span className=" text-xl font-bold text-black"></span>
          </div>
          <div>
            <span className=" text-xl font-bold text-black">Brands</span>
            <div>
              <div>
                <input
                  type="search"
                  name=""
                  id=""
                  value={brandName}
                  onChange={handleBrandName}
                  placeholder="Search Brand"
                  className=" outline-none border-b border-black"
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
      <div
        className={
          sortOption
            ? " flex justify-start bg-white w-screen shadow-xl border-4 "
            : " sm:flex justify-start bg-white w-screen shadow-xl border-4 hidden"
        }
      >
        <div className=" p-5">
          <span className=" sm:text-2xl text-xl font-bold">
            Showing Result for "{keyword}"
          </span>
          <div className="flex gap-4 font-semibold mt-2  flex-col sm:flex-row w-screen ">
            <span className=" font-semibold sm:font-medium text-xl sm:text-base">
              Sort By
            </span>
            <div className=" sm:flex flex-col sm:flex-row gap-4    flex justify-center sm:m-0 -ml-10 items-center">
              <button className=" hover:text-blue-600 sm:active:border-b-2 border-blue-600">
                Relevence
              </button>
              <button className=" sm:active:border-b-2 border-blue-600 hover:text-blue-600 ">
                Popularity
              </button>
              <button className=" sm:active:border-b-2 border-blue-600 hover:text-blue-600 ">
                Price- Low to High
              </button>
              <button className=" sm:active:border-b-2 border-blue-600 hover:text-blue-600 ">
                Price- High to Low
              </button>
              <button className=" sm:active:border-b-2 border-blue-600 hover:text-blue-600 ">
                Newest First
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
