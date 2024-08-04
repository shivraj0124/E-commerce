const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModel");
const DiscountModel = require("../Models/DiscountModel");
const SellerModel = require("../Models/SellerModel");
const CategoryModel = require("../Models/CategoryModel");
const ReviewModel = require("../Models/ReviewModel");
const LikeModel = require("../Models/LikeModel");
const UserModel = require("../Models/UserModel");
const OrderModel = require("../Models/OrderModel");
const getAllLikesByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const likes = await LikeModel.find({ user: userId }).populate({
      path: "product",
      populate: {
        path: "discount",
      },
    });
    const getUser = await UserModel.findById(userId);

    let userCart = getUser.cart;
    // console.log(userCart);
    let allLikes = [];
    if (userCart && likes && likes.length > 0 && userCart.length > 0) {
      const userCartProductIds = new Set(
        userCart.map((item) => item?.product?.toString())                   
      );

      allLikes = likes.map((like) => {
        const objectIdString = like?.product?._id?.toString();
        const hasAddedToCart = userCartProductIds.has(objectIdString);

        return {
          ...like._doc,
          hasLiked: true,
          hasAddedToCart: hasAddedToCart,
        };
      });
    }

  

    if (allLikes.length > 0) {
      res.send({
        success: true,
        message: "Likes fetched",
        allLikes,
      });
    } else {
      res.send({
        success: false,
        message: "Likes Not Found",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllReviewsByUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const review = await ReviewModel.find({ user: userId }).populate("product");
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

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;
    const user = await UserModel.findById({ _id: userId });

    if (user) {
      // Check if the product is already in the cart
      const isProductInCart = user.cart.some(
        (cartItem) => cartItem.product.toString() === productId
      );

      if (isProductInCart) {
        return res.send({
          success: true,
          message: "Product Already Added to the cart",
          user,
        });
      } else {
        user.cart.push({
          product: productId,
          quantity: quantity || 1,
        });
        await user.save();
        return res.send({
          success: true,
          message: "Product added to cart",
          user,
        });
      }
    } else {
      return res.send({
        success: false,
        message: "User Not Exist",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

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

const likeDisLikeTheProduct = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Check if the like already exists
    const existingLike = await LikeModel.findOne({
      user: userId,
      product: productId,
    });

    if (existingLike) {
      // If like exists, remove it (dislike)
      await LikeModel.findByIdAndDelete(existingLike._id);

      const getProduct = await ProductModel.findById(productId);
      if (!getProduct) {
        return res.send({
          success: false,
          message: "Product Not Found.",
        });
      }

      getProduct.likes.pull(existingLike._id);
      await getProduct.save();

      const getUser = await UserModel.findById(userId);
      if (!getUser) {
        return res.send({
          success: false,
          message: "User Not Found.",
        });
      }

      getUser.likes.pull(existingLike._id);
      await getUser.save();

      return res.send({
        success: true,
        message: "Product Disliked Successfully.",
        getProduct,
        getUser,
      });
    } else {
      // If like does not exist, create a new like
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
          message: "User Not Found.",
        });
      }

      getUser.likes.push(like._id);
      await getUser.save();

      return res.send({
        success: true,
        message: "Product Liked Successfully.",
        like,
        getProduct,
        getUser,
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const userId = req.user._id;
    const { address, city, pinCode, state } = req.body;
    const user = await UserModel.findById(userId);
    if (user) {
      user.shippingAddress.address = address;
      user.shippingAddress.city = city;
      user.shippingAddress.pinCode = pinCode;
      user.shippingAddress.state = state;

      await user.save();
      return res.send({
        success: true,
        message: "Address Updated Successfully",
        user,
      });
    } else {
      return res.send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

const updatePersonalInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    const user = await UserModel.findById(userId);
    if (user) {
      user.name = name;

      await user.save();
      return res.send({
        success: true,
        message: "Address Updated Successfully",
        user,
      });
    } else {
      return res.send({
        success: false,
        message: "User Not Found",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

const getCartInfo = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    let user = await UserModel.findById(userId).populate("cart.product").exec();
    // console.log(user);

    if (!user) {
      return res.send({ message: "User not found" });
    }
    const arrayOfProductsInCart = user.cart;
    const arrayOfUserLikes = user.likes;

    // console.log('arrayOfUserLikes',arrayOfUserLikes)
    let dataOfP = [];
    for (let i = 0; i < arrayOfProductsInCart.length; i++) {
      let hasLiked = false;
      const checkIfLike = await LikeModel.find({
        user: userId,
        product: arrayOfProductsInCart[i]?.product?._id,
      });

      if (checkIfLike.length > 0) {
        hasLiked = true;
      }
      let result = {
        ...arrayOfProductsInCart[i]._doc, // Spread operator to include all product details
        hasLiked,
        hasAddedToCart: true,
      };
      dataOfP.push(result);
    }
    let finalData = {
      ...user._doc,
      cart: dataOfP,
    };
    console.log(finalData);
    return res.send({
      success: true,
      message: "Product fetched to cart",
      finalData,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

const geSingleUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is available in req.user
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.send({ message: "User not found" });
    }
    return res.send({
      success: true,
      message: "User Info fetched",
      user,
    });
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user._id;

    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (user) {
      // Check if the product is in the cart
      const productIndex = user.cart.findIndex(
        (cartItem) => cartItem.product.toString() === productId
      );

      if (productIndex > -1) {
        // Remove the product from the cart
        user.cart.splice(productIndex, 1);
        await user.save();

        return res.send({
          success: true,
          message: "Product removed from cart",
          user,
        });
      } else {
        return res.send({
          success: false,
          message: "Product not found in cart",
        });
      }
    } else {
      return res.send({
        success: false,
        message: "User not found",
      });
    }
  } catch (err) {
    return res.send({
      success: false,
      message: err.message,
    });
  }
};

const orderTheProduct = async (req, res) => {
  const {
    orderItems,
    paymentMethod,
    paymentResult,
    shippingAddress,
    totalPrice,
    isPaid,
    status,
  } = req.body;
  const userId = req.user._id;
  console.log("orderItems,paymentMethod,paymentResult,shippingAddress,totalPrice,isPaid,status")
  console.log(
    orderItems,
    paymentMethod,
    paymentResult,
    shippingAddress,
    totalPrice,
    isPaid,
    status
  )
  const getUser =await UserModel.findById(userId)
  console.log("getUser",getUser);
  try {
    const newOrder = new OrderModel({
      user:userId,
      orderItems,
      paymentMethod,
      paymentResult,
      shippingAddress,
      totalPrice,
      isPaid,
      status,
    });
    const order = await newOrder.save();


    if(order){
      getUser.orders.push(newOrder._id);
      await getUser.save();
      return res.send({
        success: true,
        message: "Ordered Successfully",
        order,
      });
    }else{
      return res.send({
        success: false,
        message: "Failed to order ",
        order,
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
  getAllLikesByUser,
  getAllReviewsByUser,
  addToCart,
  removeFromCart,
  addReview,
  likeDisLikeTheProduct,
  editAddress,
  updatePersonalInfo,
  getCartInfo,
  geSingleUser,
  orderTheProduct,
};
