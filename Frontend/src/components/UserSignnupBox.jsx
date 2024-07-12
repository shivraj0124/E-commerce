import React from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";

const UserSignupBox = ({ showLoginBox }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordSeen = () => {
    setShowPassword(!showPassword);
  };
  const passwordNotMatch = () => toast("Password Not Matching");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignup = async(e, data) => {
    e.preventDefault();
    console.log(data);
    passwordNotMatch;
  };
  return (
    <div className=" bg-white text-black h-2/3 sm:w-1/4 w-[3/4] rounded-lg -mt-10 flex flex-col overflow-hidden  pt-6 items-center justify-between p-3 dark:bg-[#121212] dark:text-white">
      <Toaster />
      <span className=" text-center font-bold   text-3xl">Signup</span>
      <div className=" flex flex-col justify-center w-full p-2 mt-8 px-12 gap-6">
        <form
          onSubmit={handleSubmit(handleSignup)}
          className=" flex gap-4 flex-col items-center"
        >
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="text"
              placeholder="Name"
              {...register("Name", {})}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />
          </span>

          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="email"
              placeholder="Email"
              {...register("Email", {})}
              className="  outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="number"
              placeholder="Phone Number"
              {...register("Phone Number", { min: 10, maxLength: 10 })}
              className="  outline-none rounded-md p-2  bg-white dark:bg-[#121212]"
            />
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              {...register("Password", {})}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
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
              placeholder="Confirm Password"
              {...register("Confirm Password", {})}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
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
        <Link className=" text-blue-600 cursor-pointer" to={"/auth/login"}>
          {" "}
          Login here
        </Link>
      </span>{" "}
    </div>
  );
};

export default UserSignupBox;
