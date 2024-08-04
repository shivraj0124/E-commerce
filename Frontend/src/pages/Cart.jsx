import React, { useContext, useEffect, useState } from "react";
import ProductBox from "../Components/ProductBox";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../Components/Context/AuthContext";

const Cart = () => {
  const [cartLoading, setCartLoading] = useState(false);
  const { token, isLogin } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [cartUpdateFlag, setCartUpdateFlag] = useState(false);

  const getCartInfo = async () => {
    setCartLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getCartInfo`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCart(response.data.finalData.cart);
    } catch (error) {
      console.log(error);
    }
    setCartLoading(false);
  };

  const handleDislike = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product._id === productId ? { ...item, hasLiked: false } : item
      )
    );
    setCartUpdateFlag((prevFlag) => !prevFlag);
  };

  const handleCart = (productId) => {
    const updatedCart = cart.filter(
      (cartItem) => cartItem.product._id !== productId
    );
    setCart(updatedCart);
    setCartUpdateFlag((prevFlag) => !prevFlag);
  };

  useEffect(() => {
    getCartInfo();
  }, [cartUpdateFlag]);

  return (
    <div className="flex justify-center p-5">
      <Toaster />
      {!isLogin ? (
        <div className="flex w-screen justify-center text-3xl">
          Login First to See your Cart!
        </div>
      ) : (
        <>
          {cart.length > 0 ? (
            <div className="flex flex-col w-screen gap-5 sm:p-12 p-3">
              {cart.map((product) => (
                <ProductBox
                  key={product.product._id}
                  isLoading={cartLoading}
                  productId={product.product._id}
                  isProductLiked={product.hasLiked}
                  productImage={product.product.images[0]}
                  productName={product.product.name}
                  productDescription={product.product.description}
                  productPrice={product.product.price}
                  productCategory={product.product.category}
                  productBrand={product.product.brand}
                  productDiscount={product.product.discount}
                  handleDislike={handleDislike}
                  handleCart={handleCart}
                  // productStock={product.product.stock}
                  productStock={5}
                  productRating={product.product.ratings}
                  productMRP={product.product.price}
                  isProductAddedToCart={product.hasAddedToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-screen justify-center text-3xl">
              No Products in Cart!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
