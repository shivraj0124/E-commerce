const express = require("express");
const router = express.Router();
const {
  addReview,
  likeTheProduct,
  getAllProducts,
  getAllProductsByCategory,
  getSingleProduct,
  getAllCategories,
  getAllLikesByUser,
  getAllReviewsByUser,
  getAllReviewsByProduct,
  getAllLikesByProduct,
  addToCart
} = require("../Controllers/UserControllers");
const { protect } = require("../Middleware/authMiddleware");

router.get("/getAllProducts", protect, getAllProducts);
router.post("/getAllProductsByCategory", protect, getAllProductsByCategory);
router.get("/getSingleProduct/:id", protect, getSingleProduct);
router.get("/getAllCategories", protect, getAllCategories);
router.get("/getAllLikesByUser", protect, getAllLikesByUser);
router.get("/getAllReviewsByUser", protect, getAllReviewsByUser);

router.get("/getAllReviewsByProduct/:id", protect, getAllReviewsByProduct);
router.get("/getAllLikesByProduct/:id", protect, getAllLikesByProduct);

router.post("/addToCart", protect, addToCart);

router.post("/addReview", protect, addReview);
router.post("/likeTheProduct", protect, likeTheProduct);

module.exports = router;
