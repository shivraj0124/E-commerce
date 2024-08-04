import React, { useContext } from "react";
import { ProductContext } from "../Components/Context/ProductContext";
import ProductBox from "../Components/ProductBox";

const Category = () => {
  const { productsByCategory } = useContext(ProductContext);
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
      {productsByCategory != undefined ? (
        <div>
          {productsByCategory.map((product) => (
            <ProductBox
              key={product._id}
              // isLoading={loading}
              productId={product._id}
              isProductLiked={true}
              productImage={product.images[0]}
              productName={product.name}
              productDescription={product.description}
              productPrice={product.price}
              productCategory={product.category}
              productBrand={product.brand}
              productDiscount={product.discount}
              handleDislike={handleDislike}
              handleCart={handleCart}
              productStock={product.stock}
              productRating={product.ratings}
              productMRP={product.price}
              // isProductAddedToCart={product.hasAddedToCart}
            />
          ))}
        </div>
      ) : (
        <span>No Products in this Category</span>
      )}
    </div>
  );
};

export default Category;
