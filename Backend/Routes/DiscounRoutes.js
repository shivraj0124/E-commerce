const express = require("express");
const router = express.Router();
const {
  
  getAllDiscountsByProduct,
  getAllDiscounts,
  getAllDiscountsBetweenDateRange
} = require("../Controllers/DiscountController");


router.get("/getAllDiscounts", getAllDiscounts);
router.get("/getAllDiscountsByProduct/:id", getAllDiscountsByProduct);
router.post("/getAllDiscountsBetweenDateRange", getAllDiscountsBetweenDateRange);



module.exports = router;
