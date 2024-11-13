import React, { useContext, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { ThemeContext } from "../Context/ThemeContext";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import { ProductContext } from "../Context/ProductContext";

const SearchFilter = ({ isSortOption, toggleSortOption, filtersOption, toggleFilterOption }) => {
  const { searchCategory } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);

  const [value, setValue] = useState([0, 100]);
  const [is4StarAbove, setIs4StarAbove] = useState(false);
  const [is3StarAbove, setIs3StarAbove] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [brandList, setBrandList] = useState([]);

  const handlePriceChange = (event, newValue) => setValue(newValue);

  const handleMinInputChange = (event) => setValue([Number(event.target.value), value[1]]);
  const handleMaxInputChange = (event) => setValue([value[0], Number(event.target.value)]);

  const handle3StarBox = () => setIs3StarAbove(!is3StarAbove);
  const handle4StarBox = () => setIs4StarAbove(!is4StarAbove);

  const handleBrandName = (e) => setBrandName(e.target.value);

  const updateBrandsList = (e) => {
    const { value, checked } = e.target;
    setBrandList((prevList) =>
      checked ? [...prevList, value] : prevList.filter((brand) => brand !== value)
    );
  };

  const themeStyles = {
    inputProps: {
      style: {
        outlineColor: theme === "dark" ? "white" : "black",
        color: theme === "dark" ? "white" : "black",
        borderColor: theme === "dark" ? "white" : "black",
      },
    },
    inputLabelProps: {
      shrink: true,
      style: { color: theme === "dark" ? "white" : "black" },
    },
    textFieldSx: {
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
    },
  };

  const brandNames = ["Apple", "Samsung", "Xiomi", "Nokia", "Poco", "IQOO", "Realme", "Mi"];

  return (
    <>
      <div className="flex justify-between px-3 py-1 sm:hidden w-full gap-2 h-full dark:bg-slate-800">
        <button
          className={`w-1/2 h-10 rounded-md ${filtersOption ? "bg-blue-600 text-white" : "bg-white"}`}
          onClick={toggleFilterOption}
        >
          Filters
        </button>
        <button
          className={`w-1/2 h-10 rounded-md ${isSortOption ? "bg-blue-600 text-white" : "bg-white"}`}
          onClick={toggleSortOption}
        >
          Sort
        </button>
      </div>
      <div
        className={`sm:w-80 pl-6 py-6 border-4 dark:border-gray-700 shadow-xl bg-white pr-6 ${
          filtersOption ? "dark:bg-slate-800" : "hidden sm:flex flex-col dark:bg-slate-800"
        }`}
      >
        <div className="flex flex-col gap-1">
          <span className="text-xl font-bold">Categories</span>
          <span className="font-semibold text-md">{searchCategory.name}</span>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <div>
            <span className="text-xl font-bold">Price Range</span>
            <Box sx={{ width: 250 }}>
              <Slider
                getAriaLabel={() => "Price Range"}
                value={value}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={(val) => `${val} $`}
              />
            </Box>
            <div className="flex w-full gap-2 z-0">
              <TextField
                label="Min"
                type="number"
                size="small"
                onChange={handleMinInputChange}
                value={value[0]}
                InputProps={themeStyles.inputProps}
                InputLabelProps={themeStyles.inputLabelProps}
                sx={themeStyles.textFieldSx}
              />
              <TextField
                label="Max"
                type="number"
                size="small"
                onChange={handleMaxInputChange}
                value={value[1]}
                InputProps={themeStyles.inputProps}
                InputLabelProps={themeStyles.inputLabelProps}
                sx={themeStyles.textFieldSx}
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xl font-bold">Customer Ratings</span>
            <label className="flex gap-2 items-center">
              <input type="checkbox" checked={is4StarAbove} onChange={handle4StarBox} />
              4 Stars & Above
            </label>
            <label className="flex gap-2 items-center">
              <input type="checkbox" checked={is3StarAbove} onChange={handle3StarBox} />
              3 Stars & Above
            </label>
          </div>

          <div>
            <span className="text-xl font-bold">Brands</span>
            <div>
              <div>
                <input
                  type="search"
                  value={brandName}
                  onChange={handleBrandName}
                  placeholder="Search Brand"
                  className="outline-none border-b border-black dark:border-white bg-transparent font-bold mt-1"
                />
                <button className="text-slate-500 hover:text-blue-600">
                  <SearchIcon />
                </button>
                <div className="flex flex-col mt-2">
                  {brandNames.map((name, index) => (
                    <label key={index} className="flex gap-2">
                      <input type="checkbox" value={name} onChange={updateBrandsList} />
                      {name}
                    </label>
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
