import React, { useState } from "react";
import ProductBox from "../Components/ProductBox";
import axios from "axios";

const Cart = () => {
  const [cartLoading , setCartLoading] = useState(false)

  const getCartInfo = async() =>{
    setCartLoading(true)
  }
  return <div>Cart</div>;
};

export default Cart;
