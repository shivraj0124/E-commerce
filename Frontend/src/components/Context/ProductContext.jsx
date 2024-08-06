import React, { createContext, useState } from "react";
import axios from "axios";
import { LocalConvenienceStoreOutlined, ResetTv } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState({});
  

  const value = {
    searchTerm,
    searchCategory,
    productsByCategory,
    setProductsByCategory,
    setSearchCategory,
    setSearchTerm,
    
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
