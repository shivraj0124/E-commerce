const express = require("express");
const router = express.Router();
const {
  getAllDiscounts,
  getAllDiscountsByProduct,
  getAllDiscountsBetweenDateRange,
} = require("../Controllers/DiscountController");

// Route to fetch all discounts
router.get("/getAllDiscounts", getAllDiscounts);

// Route to fetch all discounts for a specific product
router.get("/getAllDiscountsByProduct/:id", getAllDiscountsByProduct);

// Route to fetch discounts within a date range
router.post("/getAllDiscountsBetweenDateRange", getAllDiscountsBetweenDateRange);

module.exports = router;
