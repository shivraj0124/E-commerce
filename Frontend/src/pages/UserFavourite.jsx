import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import axios from "axios";
import ProductBox from "../Components/ProductBox";

const UserFavourite = () => {
  const { token, isLogin } = useContext(AuthContext);
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likesUpdateFlag, setLikesUpdateFlag] = useState(false);

  const getAllLikesByUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/getAllLikesByUser`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setUserLikes(response.data.allLikes);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getAllLikesByUser();
  }, [likesUpdateFlag]);

  const handleDislike = (productId) => {
    const updatedLikes = userLikes.filter(
      (like) => like.product._id !== productId
    );
    setUserLikes(updatedLikes);
    setLikesUpdateFlag((prevFlag) => !prevFlag);
  };

  const handleCart = (productId) => {
    const updatedLikes = userLikes.map((like) =>
      like.product._id === productId
        ? { ...like, hasAddedToCart: !like.hasAddedToCart }
        : like
    );
    setUserLikes(updatedLikes);
    setLikesUpdateFlag((prevFlag) => !prevFlag);
  };

  return (
    <div className="p-5 overflow-hidden flex flex-col items-center gap-5">
      {isLogin ? (
        <>
          {userLikes.length > 0 ? (
            <div className="flex flex-col w-screen gap-5 sm:p-12 p-3 ">
              {userLikes.map((product) => (
                <ProductBox
                  key={product.product._id}
                  isLoading={loading}
                  productId={product.product._id}
                  isProductLiked={true}
                  productImage={product.product.images[0]}
                  productName={product.product.name}
                  productDescription={product.product.description}
                  productPrice={product.product.price}
                  productCategory={product.product.category}
                  productBrand={product.product.brand}
                  productDiscount={product.product.discount}
                  handleDislike={handleDislike}
                  handleCart={handleCart}
                  productStock={product.product.stock}
                  productRating={product.product.ratings}
                  productMRP={product.product.price}
                  isProductAddedToCart={product.hasAddedToCart}
                />
              ))}
            </div>
          ) : (
            <div className="flex w-screen justify-center text-3xl">
              Not Added a Product Yet !!!
            </div>
          )}
        </>
      ) : (
        <div className="flex w-screen justify-center text-3xl">
          Login First to See your Favourites!!!
        </div>
      )}
    </div>
  );
};

export default UserFavourite;
