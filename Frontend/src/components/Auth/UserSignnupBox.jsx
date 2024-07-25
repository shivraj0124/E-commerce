import React from "react";
import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ClipLoader } from "react-spinners";
const UserSignupBox = ({ showLoginBox }) => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordSeen = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState(false);
  const signupForm = useForm();
  const signupSuccessfully = () =>
    toast.success("Account Created Successfully.");
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = signupForm;

  const onSubmit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    console.log("Sign upped");
    try {
      const values = getValues();
      console.log(values);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/signup`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
          mobile: values.phone,
        }
      );

      if (response.data.success) {
        
        signupSuccessfully();
        setTimeout(() => {
          navigate("/auth/login");
        }, 2000);

        console.log("successfully data send");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
    setLoading(false);
  };
  return (
    <div className=" bg-white text-black h-2/3 sm:w-1/4 w-[3/4] rounded-lg -mt-10 flex flex-col overflow-hidden  pt-6 items-center justify-between p-3 dark:bg-[#121212] dark:text-white">
      <Toaster />
      <span className=" text-center font-bold   text-3xl">Signup</span>
      <div className=" flex flex-col justify-center w-full p-2 mt-8 px-12 gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex gap-4 flex-col items-center"
        >
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />
          </span>

          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="  outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="number"
              placeholder="Mobile Number"
              {...register("phone", { required: true, maxLength: 10 })}
              className="  outline-none rounded-md p-2  bg-white dark:bg-[#121212]"
            />
          </span>
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type={!showPassword ? "password" : "text"}
              placeholder="Password"
              {...register("password", { required: true, minLength: 8 })}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />

            <span
              className=" text-gray-600 cursor-pointer hover:text-gray-700"
              onClick={togglePasswordSeen}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </span>
          {errors.password && errors.password.type === "required" && (
            <span className=" text-red-600 text-left text-sm font-bold">
              Password is required
            </span>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <span className=" text-red-600 text-left text-sm font-bold">
              Password Must be 8 Characters long
            </span>
          )}
          <button
            type="submit"
            className=" bg-blue-600 hover:bg-blue-700  text-white  p-3 w-full text-center rounded-md"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}
          </button>
        </form>
      </div>
      <div className=" flex flex-col text-center">
        <span className=" text-sm mt-2 ">
          Already have an account
          <Link className=" text-blue-600 cursor-pointer" to={"/auth/login"}>
            {" "}
            Login here
          </Link>
        </span>
        <span className=" text-sm  ">
          Are you a Seller{" "}
          <Link
            to={"/auth/register-seller"}
            className=" text-blue-600 cursor-pointer"
          >
            Click Here
          </Link>
        </span>
      </div>
    </div>
  );
};

export default UserSignupBox;
