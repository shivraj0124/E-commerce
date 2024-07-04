import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const LoginBox = ({ setSignup }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordSeen = () => {
    setShowPassword(!showPassword);
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {};
  return (
    <div className=" bg-white text-black h-1/2 sm:w-1/4 rounded-lg -mt-10 flex flex-col overflow-hidden pt-6 items-center">
      <span className=" text-center font-bold   text-3xl">Login</span>

      <div className=" flex flex-col justify-center w-full p-2 mt-8 px-12 gap-6">
        <form
          onSubmit={handleLogin}
          className=" flex gap-4 flex-col items-center"
        >
          <span className="  flex items-center justify-between w-full border-2 px-2">
            <input
              type="email"
              required
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="   outline-none rounded-md p-2"
            />
          </span>

          <span className="flex items-center justify-between w-full border-2 px-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Login
          </button>
        </form>
      </div>
      <span className=" text-sm mt-2">
        New to ELECTRO STORE ?{" "}
        <span className=" text-blue-600 cursor-pointer" onClick={setSignup}>
          Signup
        </span>
      </span>
    </div>
  );
};

export default LoginBox;
