const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModel");
const DiscountModel = require("../Models/DiscountModel");
const SellerModel = require("../Models/SellerModel");
const CategoryModel = require("../Models/CategoryModel");
const ReviewModel = require("../Models/ReviewModel");
const LikeModel = require("../Models/LikeModel");

const addReview = async (req, res) => {
  try {
    let { userId, productId, rating, title, desc } = req.body;
    if (rating <= 0) {
      rating = 1;
    } else if (rating > 5) {
      rating = 5;
    }
    const review = new ReviewModel({
      user: userId,
      product: productId,
      rating: rating,
      title: title,
      desc: desc,
    });
    await review.save();

    const getUser = await UserModel.findById(userId);
    if (!getUser) {
      return res.send({
        success: false,
        message: "Seller Not Found.",
      });
    }

    getUser.reviews.push(review._id);
    await getUser.save();

    const getProduct = await ProductModel.findById(productId);
    if (!getProduct) {
      return res.send({
        success: false,
        message: "Product Not Found.",
      });
    }

    let avgRating = getProduct.ratings + rating;
    let totalReviews = getProduct.reviews.length + 1;
    avgRating = (avgRating / totalReviews).toFixed(1);

    getProduct.numReviews = totalReviews;
    getProduct.ratings = avgRating;
    getProduct.reviews.push(review._id);

    await getProduct.save();

    return res.send({
      success: true,
      message: "Review Uploaded Successfully.",
      review,
      getProduct,
      getUser,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const likeTheProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const like = new LikeModel({
      user: userId,
      product: productId,
    });
    await like.save();

    const getProduct = await ProductModel.findById(productId);
    if (!getProduct) {
      return res.send({
        success: false,
        message: "Product Not Found.",
      });
    }

    getProduct.likes.push(like._id);
    await getProduct.save();

    const getUser = await UserModel.findById(userId);
    if (!getUser) {
      return res.send({
        success: false,
        message: "Seller Not Found.",
      });
    }

    getUser.likes.push(like._id);
    await getUser.save();

    return res.send({
      success: true,
      message: "Review Uploaded Successfully.",
      like,
      getProduct,
      getUser,
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addReview,
  likeTheProduct,
};
