const express = require("express")
const router = express.Router()
const {addNewProduct,getSellerFullData,updateProduct,addDiscount} = require("../Controllers/SellerController")
const {protect2} = require('../Middleware/authMiddleware')

router.post("/addNewProduct",protect2,addNewProduct)
router.post("/getSellerFullData",protect2,getSellerFullData)
router.post("/updateProduct",protect2,updateProduct)
router.post("/addDiscount",protect2,addDiscount)

module.exports = router