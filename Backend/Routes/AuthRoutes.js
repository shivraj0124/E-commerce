const express = require("express");
const router = express.Router();

const {
  loginController,
  signupController,
  registerSeller,
  verifyToken,
} = require("../Controllers/AuthController");
const { protect } = require("../Middleware/authMiddleware");
router.post("/login", loginController);
router.post("/signup", signupController);
router.post("/registerSeller", registerSeller);
router.get("/verify", protect, verifyToken);

module.exports = router;
