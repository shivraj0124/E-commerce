import React, { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
const LoginBox = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordSeen = () => {
    setShowPassword(!showPassword);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupSuccessfully = () => {
    toast.success("Login Successfully!!!");
  };
  const { setToken, setIsLogin, setUserDetails, userDetails } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const handleLogin = async (data, e) => {
    e.preventDefault();
    const values = getValues();
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      if (response.data.success) {
        signupSuccessfully();
        cookies.set("token", response.data.token, { expires: 30 });
        setToken(cookies.get("token"));
        setUserDetails(response.data.user);
        
        setIsLogin(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
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
    <div className=" bg-white text-black h-1/2 sm:w-1/4 rounded-lg -mt-10 flex flex-col overflow-hidden pt-6 items-center  dark:bg-[#121212] dark:text-white">
      <Toaster />
      <span className=" text-center font-bold   text-3xl">Login</span>

      <div className=" flex flex-col justify-center w-full p-2 mt-8 px-12 gap-6">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className=" flex gap-4 flex-col items-center"
        >
          <span className="  flex items-center justify-between w-full border-2 px-2 ">
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: true })}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />
          </span>
          {errors.email && errors.email.type === "required" && (
            <span className="text-red-600 text-sm">Email Id is required</span>
          )}
          <span className="flex items-center justify-between w-full border-2 px-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="password"
              {...register("password", { required: true })}
              className="   outline-none rounded-md p-2 bg-white dark:bg-[#121212]"
            />
            <span
              className=" text-gray-600 cursor-pointer hover:text-gray-700"
              onClick={togglePasswordSeen}
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </span>
          </span>
          {errors.password && errors.password.type == "required" && (
            <span className="text-red-600 text-sm">Password is required</span>
          )}
          <span
            className=" text-blue-500 underline cursor-pointer text-center mb-5 mt-1"
            type=" "
          >
            Forget Password
          </span>
          <button
            type="submit"
            className=" bg-blue-600 hover:bg-blue-700  text-white  p-3 w-full text-center rounded-md"
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Login"}
          </button>
        </form>
      </div>
      <span className=" text-sm mt-2">
        New to ELECTRO STORE ?{" "}
        <Link
          className=" text-blue-600 cursor-pointer"
          to={"/auth/register-user"}
        >
          Signup
        </Link>
      </span>
    </div>
  );
};

export default LoginBox;
