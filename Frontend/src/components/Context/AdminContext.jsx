import React, { createContext, useContext, useEffect, useState } from "react";
const Context = createContext();

export const AdminProvider = ({ children }) => {
  const [sideBarLocation,setSidebarLocation]=useState("")
  const [isOpenSidebar,setIsOpenSidebar]=useState(false)
 
  const value = {
   sideBarLocation,
   setSidebarLocation,
   isOpenSidebar,
   setIsOpenSidebar
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const adminHook = () => {
  const context = useContext(Context);
  return context;
};

export default adminHook;