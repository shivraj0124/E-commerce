import React from "react";
import ReactSlider from "react-slider";
const Search = ({ category, keyword }) => {
  return (
    <div className=" p-1 bg-slate-200 flex w-screen h-full gap-2">
      <div className=" w-80 pl-6  py-6  border-4 shadow-xl bg-white">
        <span className=" flex flex-col gap-1">
          <span className=" text-xl font-bold text-black">Categories</span>
          <span className=" text-gray-600 text-md">Mobile Phones</span>
        </span>
        <div>
          <span>
            <ReactSlider
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              renderThumb={(props, state) => (
                <div {...props}>{state.valueNow}</div>
              )}
            />
          </span>
          <span className=" flex ">
            <input type="number" className=" bg-t" />
            to
            <input type="number" className=" bg-transparent" />
          </span>
        </div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className=" flex justify-start">results</div>
    </div>
  );
};

export default Search;
