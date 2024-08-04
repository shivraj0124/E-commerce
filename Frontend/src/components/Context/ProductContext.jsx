import React, { createContext, useState } from "react";
import axios from "axios";
import { LocalConvenienceStoreOutlined, ResetTv } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [searchCategory, setSearchCategory] = useState({});
  const [productLoading, setProductLoading] = useState(false);
  const navigate = useNavigate();
  const [product, setproduct] = useState(null);

  const openProductPage = async (productId) => {
    setProductLoading(true);
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/product/getSingleProduct/${productId}`
      );
      if (response.data.success) {
        setproduct(response.data.product[0]);
        navigate(`/product/${productId}`);
        // console.log(response)
      }
      // console.log(response)
    } catch (error) {
      console.log(error)
    }
    setProductLoading(false)
  };
  const value = {
    searchTerm,
    searchCategory,
    productsByCategory,
    setProductsByCategory,
    setSearchCategory,
    setSearchTerm,
    productLoading,
    product,
    openProductPage
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
