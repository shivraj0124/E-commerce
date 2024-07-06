const express = require("express")
const router = express.Router()
const {addReview,likeTheProduct} = require("../Controllers/AdminController")
const protect = require("../Middleware/authMiddleware")

router.post("/addReview",protect,addReview)
router.post("/likeTheProduct",protect,likeTheProduct)

module.exports = router