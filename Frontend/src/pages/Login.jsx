import React from "react";
import { LoginBox, SignupBox } from "../components";
import { useState } from "react";

const Login = () => {
  const [isLoginBox, setIsLoginBox] = useState(false);

  const toggleLoginOption = () => {
    setIsLoginBox(!isLoginBox);
  };
  return (
    <div className=" w-screen h-screen bg-blue-600 text-white flex justify-center items-center p-6">
      {isLoginBox ? (
        <LoginBox setSignup={toggleLoginOption} />
      ) : (
        <SignupBox showLoginBox={toggleLoginOption} />
      )}
    </div>
  );
};

export default Login;
