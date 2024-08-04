import React, { useContext } from "react";
import { ProductContext } from "../Components/Context/ProductContext";

const Product = () => {
  const { productLoading, product } = useContext(ProductContext);
  console.log(product)
  return <div>{product.name}</div>;
};

export default Product;
