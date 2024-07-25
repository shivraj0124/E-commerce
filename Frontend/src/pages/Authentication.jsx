import React, { useState } from "react";

import { Outlet } from 'react-router-dom'

const Authentication = () => {
  const [isLoginBox, setIsLoginBox] = useState(true);
  const toggleLoginOption = () => {
    setIsLoginBox(!isLoginBox);
  };

  return (
    <div className=" flex h-screen w-screen bg-blue-600 dark:bg-blue-700 justify-center items-center">
      {<Outlet />}
    </div>
  );
};

export default Authentication;
