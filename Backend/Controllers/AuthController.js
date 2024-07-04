const express = require("express");
const UserModel = require("../Models/UserModel");
const generateToken = require("../Utils/generateToken");

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await UserModel.findOne({ email });
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
  } catch (err) {
    return res.send({
      success: false,
      message: err,
    });
  }
};

const signupController = async (req, res) => {
  try {
    let { name, email, password, role, shippingAddress, mobile } = req.body;
    console.log(name, email, password, role, mobile, shippingAddress);

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
      shippingAddress: {
        address: shippingAddress.address,
        city: shippingAddress.city,
        pinCode: shippingAddress.pinCode,
        state: shippingAddress.state,
      },
    });

    await user.save();
    return res.send({
      success: false,
      message: "Account Created Successfully. Login first to Continue",
    });
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  loginController,
  signupController,
};
