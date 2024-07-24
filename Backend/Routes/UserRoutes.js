const express = require("express");
const router = express.Router();
const {
  addReview,
  likeDisLikeTheProduct,
  getAllLikesByUser,
  getAllReviewsByUser,
  addToCart,
  editAddress,
  updatePersonalInfo,
} = require("../Controllers/UserControllers");
const { protect } = require("../Middleware/authMiddleware");

router.get("/getAllLikesByUser", protect, getAllLikesByUser);
router.get("/getAllReviewsByUser", protect, getAllReviewsByUser);

router.post("/addToCart", protect, addToCart);

router.post("/addReview", protect, addReview);
router.post("/likeDisLikeTheProduct", protect, likeDisLikeTheProduct);
router.post("/editAddress", protect, editAddress);
router.post("/updatePersonalInfo", protect, updatePersonalInfo);

module.exports = router;
