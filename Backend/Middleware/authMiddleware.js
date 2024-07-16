const jwt = require("jsonwebtoken");
const User = require("../Models/UserModel");
const Seller = require("../Models/SellerModel");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decode.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized" });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

const protect2 = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Seller.findById(decode.userId).select("-password");

      if (!req.user) {
        return res.status(401).json({ success: false, message: "Not authorized" });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ success: false, message: "Not authorized" });
    }
  } else {
    return res.status(401).json({ success: false, message: "Not authorized, no token" });
  }
};

module.exports = { protect, protect2 };
