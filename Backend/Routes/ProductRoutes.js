const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getAllProductsByCategory,
  getSingleProduct,
  getAllCategories,
  getAllReviewsByProduct,
  getAllLikesByProduct,
} = require("../Controllers/ProductController");

router.get("/getAllProducts", getAllProducts);
router.post("/getAllProductsByCategory", getAllProductsByCategory);
router.get("/getSingleProduct/:id", getSingleProduct);
router.get("/getAllCategories", getAllCategories);

router.get("/getAllReviewsByProduct/:id", getAllReviewsByProduct);
router.get("/getAllLikesByProduct/:id", getAllLikesByProduct);
module.exports = router;
