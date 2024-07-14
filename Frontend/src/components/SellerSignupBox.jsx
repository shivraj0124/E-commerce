import React, { useState } from "react";
import StepWizard from "react-step-wizard";
import { useForm } from "react-hook-form";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const SellerSignupBox = () => {
  const stepOneForm = useForm();
  const stepTwoForm = useForm();
  const [formData, setFormData] = useState({});
  const signupSuccessfully = () =>
    toast.success("Account Created Successfully.");
  const [showPass, setShowPass] = useState(false);
  const toggleShowPass = () => {
    setShowPass(!showPass);
  };
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const Step1 = ({ nextStep }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = stepOneForm;
    const onSubmit = (data, e) => {
      e.preventDefault();
      const values = getValues();

      if (!values.name || !values.email || !values.phone || !values.password) {
        failedToast();
        console.log("error 1");
        return;
      }

      if (values.password.length < 8) {
        failedToast();
        console.log("error 2");
        return;
      }

      if (values.phone.length !== 10) {
        failedToast();
        console.log("error 3");
        return;
      }
      setFormData((prevData) => ({ ...prevData, ...data }));
      nextStep();
      console.log("Step One Completed");
    };

    return (
      <div className="bg-white flex justify-around flex-col p-12 h-2/3 rounded-lg shadow-sm -mt-10 dark:bg-[#121212]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="text-center text-2xl font-bold">
            Create a Seller Account
          </span>
          <div className="flex flex-col p-2 gap-6">
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: true })}
              className="dark:bg-[#121212] bg-white outline-none p-2 border-2"
            />
            <input
              type="email"
              placeholder="email"
              {...register("email", { required: true })}
              className="dark:bg-[#121212] bg-white outline-none p-2 border-2"
            />
            <input
              type="tel"
              placeholder="phone"
              maxLength={10}
              {...register("phone", {
                required: true,
                minLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone number must be 10 digits",
                },
              })}
              className="dark:bg-[#121212] bg-white outline-none p-2 border-2"
            />
            {errors.phone && errors.phone.type === "minLength" (
              <span className="text-red-600 text-sm">
                Enter 10 Digit Phone Number
              </span>
            )}
            <span className="border-2 flex justify-between items-center p-2">
              <input
                type={showPass ? "text" : "password"}
                placeholder="password"
                {...register("password", { required: true, minLength: 8 })}
                className="dark:bg-[#121212] bg-white outline-none"
              />
              <span className="cursor-pointer" onClick={toggleShowPass}>
                {showPass ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </span>
            </span>
            {errors.password && (
              <span className="text-red-600 text-sm">
                Password Must be 8 Characters long
              </span>
            )}
            <button
              type="submit"
              className="bg-blue-600 p-2 rounded-md text-white dark:bg-blue-800"
            >
              Next
            </button>
          </div>
        </form>
        <span className="text-center text-sm">
          Are you a user{" "}
          <Link
            to={"/auth/register-user"}
            className="text-blue-600 cursor-pointer"
          >
            Register here
          </Link>
        </span>
      </div>
    );
  };

  const Step2 = ({ currentStep, goToStep }) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = stepTwoForm;

    const onSubmit = async (data, e) => {
      e.preventDefault();
      const finalFormData = { ...formData, ...data };
      setLoading(true);

      setFormData(finalFormData);
      console.log(formData);

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/registerSeller`,
          {
            name: finalFormData.name,
            email: finalFormData.email,
            mobile: finalFormData.phone,
            password: finalFormData.password,
            storeName: finalFormData.storeName,
            storeDescription: finalFormData.storeDescription,
            storeAddress: finalFormData.storeAddress,
          }
        );

        if (response.data.success) {
          signupSuccessfully();
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
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
      <div className="bg-white flex justify-around flex-col p-12 rounded-lg shadow-sm -mt-10 dark:bg-[#121212] gap-2">
        <div className="flex justify-start">
          <button onClick={() => goToStep(1)}>
            <ArrowBackIcon />
          </button>
          <span className="text-2xl font-bold text-center">
            Additional Information
          </span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col p-2 gap-6">
            <input
              type="text"
              placeholder="Store Name"
              {...register("storeName", { required: true })}
              className="dark:bg-[#121212] bg-white outline-none p-2 border-2"
            />
            <input
              type="text"
              placeholder="Store Description"
              {...register("storeDescription", { required: true })}
              className="dark:bg-[#121212] bg-white outline-none p-2 border-2"
            />
            <input
              type="text"
              placeholder="Address"
              {...register("address", { required: true, maxLength: 50 })}
              className="dark:bg-[#121212] bg-white outline-none p-2 border-2"
            />

            <button
              className="bg-blue-600 p-2 rounded-md text-white dark:bg-blue-800 cursor-pointer"
              type="submit"
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="flex justify-center">
      <Toaster />
      <StepWizard initialStep={1}>
        <Step1 />
        <Step2 />
      </StepWizard>
    </div>
  );
};

export default SellerSignupBox;
