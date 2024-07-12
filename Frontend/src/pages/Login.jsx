import React, { useContext } from "react";
import { LoginBox, SignupBox } from "../Components";
import { useState } from "react";
import { ThemeContext } from "../ThemeContext";

const Login = () => {
  const [isLoginBox, setIsLoginBox] = useState(true);
  const {theme , toggleTheme} = useContext(ThemeContext)
  const toggleLoginOption = () => {
    setIsLoginBox(!isLoginBox);
  };
  return (
    <div className=" w-screen h-screen bg-blue text-white flex justify-center items-center p-6 dark:bg-dark_blue">
      {isLoginBox ? (
        <LoginBox setSignup={toggleLoginOption} />
      ) : (
        <SignupBox showLoginBox={toggleLoginOption} />
      )}
    </div>
  );
};

export default Login;
