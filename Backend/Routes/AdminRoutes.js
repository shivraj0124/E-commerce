const express = require("express")
const router = express.Router()
const {addNewProduct,addNewCategory,getSellerFullData,addReview,likeTheProduct} = require("../Controllers/AdminController")

const protect = require("../Middleware/authMiddleware")

router.post("/addNewCategory",addNewCategory)
router.post("/addNewProduct",addNewProduct)
router.post("/getSellerFullData",getSellerFullData)
router.post("/addReview",addReview)
router.post("/likeTheProduct",likeTheProduct)

module.exports = router