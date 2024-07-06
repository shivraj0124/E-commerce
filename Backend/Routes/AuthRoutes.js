const express = require("express")
const router = express.Router()

const { loginController,signupController,registerSeller } = require("../Controllers/AuthController")

router.post('/login',loginController)
router.post('/signup',signupController)
router.post('/registerSeller',registerSeller)

module.exports = router