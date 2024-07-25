const mongoose = require("mongoose");
const DiscountModel = require("../Models/DiscountModel");

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await DiscountModel.find().populate("products");
    if (discounts && discounts.length > 0) {
      res.send({
        success: true,
        message: "Discounts fetched",
        discounts,
      });
    } else {
      res.send({
        success: false,
        message: "No discounts Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};

const getAllDiscountsByProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    console.log(productId);
    const discounts = await DiscountModel.find({
      products: { $in: [new mongoose.Types.ObjectId(productId)] },
    }).populate("products");
    if (discounts && discounts.length > 0) {
      res.send({
        success: true,
        message: "Discounts fetched",
        discounts,
      });
    } else {
      res.send({
        success: false,
        message: "No discounts Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};
const getAllDiscountsBetweenDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    let formattedStartDate = new Date(startDate);
    let formattedEndDate = new Date(endDate);
    console.log("formatedDate",formattedStartDate);
    console.log("formatedDate",formattedEndDate);
    const discounts = await DiscountModel.find({
      startDate: { $lte: formattedEndDate },
      endDate: { $gte: formattedStartDate },
    }).populate("products");

    if (discounts && discounts.length > 0) {
      res.send({
        success: true,
        message: "Discounts fetched",
        discounts,
      });
    } else {
      res.send({
        success: false,
        message: "No discounts Found ",
      });
    }
  } catch (err) {
    res.send({
      success: false,
      message: err.message,
    });
  }
};



module.exports = {
  getAllDiscounts,
  getAllDiscountsByProduct,
  getAllDiscountsBetweenDateRange,
};
