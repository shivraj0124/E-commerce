import React from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import "../index.css";
const SignupBox = ({ showLoginBox }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordSeen = () => {
    setShowPassword(!showPassword);
  };
  const handleSignup = () => {};
  return (
    <div className=" bg-white text-black h-2/3 sm:w-1/4 w-full rounded-lg -mt-10 flex flex-col overflow-hidden  pt-6 items-center justify-between p-3">
      <span className=" text-center font-bold   text-3xl">Signup</span>
      <div className=" flex flex-col justify-center w-full p-2 mt-8 px-12 gap-6">
        <form
          onSubmit={handleSignup}
          className=" flex gap-4 flex-col items-center"
        >
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="text"
              placeholder="Name"
              required
              className="   outline-none rounded-md p-2"
            />
          </span>

          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="text"
              placeholder="Email"
              required
              className="  outline-none rounded-md p-2"
            />
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="number"
              placeholder="Phone"
              required
              className="  outline-none rounded-md p-2 "
            />
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              required
              className="   outline-none rounded-md p-2"
            />
            <span
              className=" text-gray-600 cursor-pointer hover:text-gray-700"
              onClick={togglePasswordSeen}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="password"
              required
              placeholder="Confirm Passoword"
              className="   outline-none rounded-md p-2"
            />
          </span>
          <button
            type="submit"
            className=" bg-blue-600 hover:bg-blue-700  text-white  p-3 w-full text-center rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
      <span className=" text-sm mt-2">
        Already have an account
        <span className=" text-blue-600 cursor-pointer" onClick={showLoginBox}>
          {" "}
          Login here
        </span>
      </span>{" "}
    </div>
  );
};

export default SignupBox;
