const ProductModel = require("../Models/ProductModel");
const LikeModel = require("../Models/LikeModel");
const UserModel = require("../Models/UserModel");

const getProductData = async (products, userId) => {
  let dataOfP = [];

  if (userId) {
    const getUser = await UserModel.findById(userId);
    let userCart = getUser.cart;
    const userCartProductIds = new Set(
      userCart.map((item) => item?.product?.toString())
    );

    const likedProducts = await LikeModel.find({ user: userId })
      .select("product")
      .lean();

    const likedProductIds = new Set(
      likedProducts.map((like) => like.product.toString())
    );

    for (let i = 0; i < products.length; i++) {
      const objectIdString = products[i]._id?.toString();
      const hasLiked = likedProductIds.has(objectIdString);
      const hasAddedToCart = userCartProductIds.has(objectIdString);

      let result = {
        ...products[i]._doc,
        hasLiked,
        hasAddedToCart,
      };
      dataOfP.push(result);
    }
  }

  if (dataOfP.length === 0 && products.length !== 0) {
    dataOfP = products;
  }

  return dataOfP;
};

module.exports = { getProductData };
