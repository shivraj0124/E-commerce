const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Seller = require("../Models/SellerModel");

const protect = async (req, res, next) => {
  console.log(req.headers.authorization);
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("hello");
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select("-password");
      next();
    } catch (err) {
      res.send({ success: false, message: "Not authorized" });
    }
  }
  if (!token) {
    res.send({ success: false, message: "Not authorized , No Token" });
  }
};

const protect2 = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Seller.findById(decode.userId).select("-password");

      next();
    } catch (err) {
      res.send({ success: false, message: "Not authorized" });
    }
  }

  if (!token) {
    res.send({ success: false, message: "Not authorized , No Token" });
  }
};

module.exports = { protect, protect2 };
