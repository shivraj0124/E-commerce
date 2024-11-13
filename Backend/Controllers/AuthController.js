const express = require("express");
const UserModel = require("../Models/UserModel");
const SellerModel = require("../Models/SellerModel");
const generateToken = require("../Utils/generateToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email });
    if (user) {
      if (user && user.password === password) {
        console.log(password, "Password", user.password);
        return res.send({
          success: true,
          message: "Login Successful",
          user,
          token: generateToken(user._id),
        });
      } else if (user) {
        return res.send({
          success: false,
          message: "Invalid Password",
        });
      } else {
        return res.send({
          success: false,
          message: "Invalid Email and Password",
        });
      }
    } else {
      const seller = await SellerModel.findOne({ email });
      if (seller && seller.password === password) {
        console.log(password, "Password", seller.password);
        return res.send({
          success: true,
          message: "Login Successful",
          seller,
          token: generateToken(seller._id),
        });
      } else if (seller) {
        return res.send({
          success: false,
          message: "Invalid Password",
        });
      } else {
        return res.send({
          success: false,
          message: "Invalid Email and Password",
        });
      }
    }
  } catch (err) {
    return res.send({
      success: false,
      message: err,
    });
  }
};

const signupController = async (req, res) => {
  try {
    let { name, email, password, role, mobile } = req.body;
    console.log(name, email, password, role, mobile);

    if (!email) {
      return res.send({
        success: false,
        message: "Email is required.",
      });
    }

    if (!mobile || mobile.length != 10) {
      return res.send({
        success: false,
        message: "Mobile number is required and It's exact of 10 digits",
      });
    }
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      return res.send({
        success: false,
        message: "User Already exist with this Email.",
      });
    }
    const existUserM = await UserModel.findOne({ mobile: mobile });
    if (existUserM) {
      return res.send({
        success: false,
        message: "User Already exist with this Mobile No.",
      });
    }
    const existSeller = await SellerModel.findOne({ email: email });
    if (existSeller) {
      return res.send({
        success: false,
        message: "User Already exist with this Email.",
      });
    }
    const existSellerM = await SellerModel.findOne({ mobile: mobile });
    if (existSellerM) {
      return res.send({
        success: false,
        message: "User Already exist with this Mobile No.",
      });
    }
    if (!name) {
      return res.send({
        success: false,
        message: "Name is required.",
      });
    }
    if (!password || password.length < 8) {
      return res.send({
        success: false,
        message: "Password is required and minimum of 8 characters",
      });
    }
    if (!role) {
      role = "User";
    }
    const user = new UserModel({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      role: role,
    });

    await user.save();
    return res.send({
      success: true,
      message: "Account Created Successfully. Login first to Continue",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const registerSeller = async (req, res) => {
  try {
    let {
      name,
      email,
      password,
      mobile,
      storeName,
      storeDescription,
      storeAddress,
    } = req.body;
    console.log(
      name,
      email,
      password,
      mobile,
      storeName,
      storeDescription,
      storeAddress
    );

    if (!email) {
      return res.send({
        success: false,
        message: "Email is required.",
      });
    }

    if (!mobile || mobile.length != 10) {
      return res.send({
        success: false,
        message: "Mobile number is required and It's exact of 10 digits",
      });
    }
    const existSeller = await SellerModel.findOne({ email: email });
    if (existSeller) {
      return res.send({
        success: false,
        message: "User Already exist with this Email.",
      });
    }
    const existSellerM = await SellerModel.findOne({ mobile: mobile });
    if (existSellerM) {
      return res.send({
        success: false,
        message: "User Already exist with this Mobile No.",
      });
    }
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      return res.send({
        success: false,
        message: "User Already exist with this Email as Customer",
      });
    }

    const existUserM = await UserModel.findOne({ mobile: mobile });
    if (existUserM) {
      return res.send({
        success: false,
        message: "User Already exist with this Mobile No. as Customer",
      });
    }
    if (!name) {
      return res.send({
        success: false,
        message: "Name is required.",
      });
    }
    if (!password || password.length < 8) {
      return res.send({
        success: false,
        message: "Password is required and minimum of 8 characters",
      });
    }
    const user = new SellerModel({
      name: name,
      email: email,
      password: password,
      mobile: mobile,
      storeName: storeName,
      storeDescription: storeDescription,
    });

    await user.save();
    return res.send({
      success: true,
      message: "Account Created Successfully. Login first to Continue.",
    });
  } catch (err) {
    res.send({
      success: true,
      message: err.message,
    });
  }
};
const verifyToken = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Token is valid",
      user: req.user,
    });
   
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports = {
  loginController,
  signupController,
  registerSeller,
  verifyToken,
};
