import React, { useState } from "react";
import { LoginBox, UserSignupBox } from "../Components";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  const [isLoginBox, setIsLoginBox] = useState(true);
  const toggleLoginOption = () => {
    setIsLoginBox(!isLoginBox);
  };

  return (
    <div className=" flex h-screen w-screen bg-blue-600 dark:bg-blue-700 justify-center items-center">
      <Routes>
        <Route path="/login" element={<LoginBox />} />
        <Route path="/register-user" element={<UserSignupBox />} />
      </Routes>
    </div>
  );
};

export default Authentication;
