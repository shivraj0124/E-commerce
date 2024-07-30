import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import axios from "axios";
import ProductBox from "../ProductBox";

const UserFavourite = () => {
  const { token } = useContext(AuthContext);
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false); // State to trigger useEffect

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
  }, [userLikes, updateFlag]);
  const handleDislike = (productId) => {
    setUserLikes((prevLikes) =>
      prevLikes.filter((like) => like.product._id !== productId)
    );
    setUpdateFlag((prevFlag) => !prevFlag);
  };
  return (
    <div className="p-5 w-full overflow-hidden flex flex-col items-center bg-slate-100 dark:bg-slate-800 gap-5">
      {userLikes.map((product) => (
        <ProductBox
          key={product.product._id}
          productId={product.product._id}
          isProductLiked={true}
          productImage={product.product.images[0]}
          productName={product.product.name}
          productDescription={product.product.description}
          productPrice={product.product.price}
          productCategory={product.product.category}
          productBrand={product.product.brand}
          // productDiscount={product.product.discount}
          productDiscount={50}
          handleDislike={handleDislike}
          productStock={product.product.stock}
          // productStock={8}
          productRating={product.product.ratings}
          productMRP={product.product.price}
          isProductAddedToCart={product.hasAddedToCart}
        />
      ))}
    </div>
  );
};

export default UserFavourite;
