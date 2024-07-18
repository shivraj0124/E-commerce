import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(Cookies.get("token") ? true : false);
  const [userDetails, setUserDetails] = useState();
  const [token, setToken] = useState(
    Cookies.get("token") ? Cookies.get("token") : undefined
  );

  const verifyAuth = async () => {
    
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/verify`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLogin(true);
      setUserDetails(response.data.user);
      
    } catch (error) {
      console.log("Verification Error:", error);
      setIsLogin(false);
      setUserDetails(null);
    }
  };

  useEffect(() => {
    if (token) {
      verifyAuth();
    }
  }, [token]);
  const value = {
    isLogin,
    setIsLogin,
    userDetails,
    setUserDetails,
    token,
    setToken,
    verifyAuth,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthProvider };
