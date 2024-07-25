import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Components/Context/AuthContext";
import axios from "axios";
import { LoaderIcon } from "react-hot-toast";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const UserFavourite = () => {
  const { token } = useContext(AuthContext);
  const [userLikes, setUserLikes] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setUserLikes(response.data.likes);
      console.log(userLikes);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const calculateDiscountPrice = (originalPrice, discountPercentage) => {
    const discount = originalPrice * (discountPercentage / 100);
    const discountedPrice = originalPrice - discount;
    return discountedPrice;
  };
  useEffect(() => {
    getAllLikesByUser();
  }, []);

  return (
    <div className=" p-20 w-screen flex justify-center flex-col gap-5 items-center bg-slate-100 dark:bg-slate-800 cursor-pointer">
      {
        loading ? (
          <div>
            <div className=" flex w-4/5 shadow-md rounded-md bg-white dark:bg-[#121212] p-5">
              <div className="relative h-52 w-1/6">
                <Skeleton className="absolute inset-0 h-full w-full object-cover rounded-md aspect-3/2" />
              </div>
            </div>
          </div>
        ) : (
          // userLikes && userLikes.length > 0 ? (
          userLikes.map((product) => (
            <div className=" flex w-4/5 shadow-md rounded-md bg-white dark:bg-[#121212] p-5 gap-3">
              <div className="relative h-52 w-1/6">
                <img
                  src={product.product.images[0]}
                  alt="product image"
                  className="absolute inset-0 h-full w-full object-cover rounded-md aspect-3/2"
                />
              </div>
              <div className=" w-2/3 flex flex-col gap-3">
                <span className=" font-bold text-3xl">
                  {product.product.name}
                </span>
                <p className=" indent-4 overflow-hidden font-light text-medium">
                  {product.product.description}
                </p>
              </div>
              <div>
                <div className="flex flex-col">
                  <span className="font-bold text-3xl font-oswald ">
                    {/* {product.product.discount
                    ? `₹${calculateDiscountPrice( 
                        product.product.productPrice,
                        product.product.discount.discountPercentage
                      )}`
                    : `₹${product.product.productPrice}`} */}
                    ₹{product.product.price}
                  </span>
                  {/* <span className="flex items-center gap-1 text-center">
                  <span className="font-light text-xl line-through text-center">
                    {product.product.discount
                      ? product.product.productPrice
                      : ""}
                  </span>{" "}
                  <span className="text-green-600 font-semibold text-center">
                    {product.product.discount
                      ? `${product.product.discount}% off`
                      : "No Discount"}
                  </span>
                </span>
                {product.product.stock <= 5 && (
                  <span className="text-red-500 font-semibold">
                    Only {product.product.stock} left
                  </span>
                )} */}
                </div>
              </div>
            </div>
          ))
        )
        // )
        // : (
        //   <span>No Products Found</span>
        // )
      }
      {}
    </div>
  );
};

export default UserFavourite;
