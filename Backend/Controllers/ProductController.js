const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModel");
const CategoryModel = require("../Models/CategoryModel");
const UserModel = require("../Models/UserModel");
const LikeModel = require("../Models/LikeModel");

const getAllProducts = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log("user Id is ",req.body);
    const products = await ProductModel.find()
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      })
      .populate("discount");

    let dataOfP = [];
    if (products && products.length > 0) {
      if (userId) {
        const getUser = await UserModel.findById(userId);

        let userCart = getUser.cart;
        // Check if the user has liked each product
        const userCartProductIds = new Set(
          userCart.map((item) => item?.product?.toString())
        );
        console.log("Hello");
        for (let i = 0; i < products.length; i++) {
          let hasLiked = false;
          const checkIfLike = await LikeModel.find({
            user: userId,
            product: products[i]._id,
          });
          const objectIdString = products[i]._id?.toString();
          const hasAddedToCart = userCartProductIds.has(objectIdString);
          if (checkIfLike.length > 0) {
            hasLiked = true;
          }
          let result = {
            ...products[i]._doc, // Spread operator to include all product details
            hasLiked,
            hasAddedToCart,
          };
          dataOfP.push(result);
        }
      }
      if (dataOfP.length === 0 && products.length !== 0) {
        dataOfP = products;
      }
      res.send({
        success: true,
        message: "Products fetched",
        dataOfP,
      });
      // console.log(dataOfP);
    } else {
      res.send({
        success: false,
        message: "No Products Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllProductsByCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const products = await ProductModel.find({ category: category })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      })
      .populate("discount");
    if (products && products.length > 0) {
      res.send({
        success: true,
        message: "Products fetched",
        products,
      });
    } else {
      res.send({
        success: false,
        message: "No Products Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const product = await ProductModel.find({ _id: productId })
      .populate({
        path: "reviews",
        populate: {
          path: "user",
        },
      })
      .populate("discount");
    if (product && product.length > 0) {
      res.send({
        success: true,
        message: "Product fetched",
        product,
      });
    } else {
      res.send({
        success: false,
        message: "No Product Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    if (categories && categories.length > 0) {
      res.send({
        success: true,
        message: "Category fetched",
        categories,
      });
    } else {
      res.send({
        success: false,
        message: "Categories Not Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllReviewsByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const review = await ReviewModel.find({ product: productId }).populate(
      "user"
    );
    if (review && review.length > 0) {
      res.send({
        success: true,
        message: "Reviews fetched",
        review,
      });
    } else {
      res.send({
        success: false,
        message: "Reviews Not Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllLikesByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const likes = await LikeModel.find({ product: productId }).populate(
      "product"
    );
    if (likes && likes.length > 0) {
      res.send({
        success: true,
        message: "Likes fetched",
        likes,
      });
    } else {
      res.send({
        success: false,
        message: "Likes Not Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getAllProductsByCategory,
  getSingleProduct,
  getAllCategories,
  getAllReviewsByProduct,
  getAllLikesByProduct,
};
