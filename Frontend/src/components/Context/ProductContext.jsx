import React, {
  createContext,
  useState,
  useEffect,
  Children,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState({});

  const value = {
    searchTerm,
    searchCategory,
    setSearchCategory,
    setSearchTerm,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
