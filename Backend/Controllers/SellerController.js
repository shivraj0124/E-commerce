const mongoose = require("mongoose");
const ProductModel = require("../Models/ProductModel");
const DiscountModel = require("../Models/DiscountModel");
const SellerModel = require("../Models/SellerModel");
const CategoryModel = require("../Models/CategoryModel");
const ReviewModel = require("../Models/ReviewModel");
const LikeModel = require("../Models/LikeModel");

const addNewProduct = async (req, res) => {
    const {
      id,
      name,
      description,
      price,
      category,
      brand,
      stock,
      discount,
      images,
    } = req.body;
    console.log(
      "Data :: ",
      id,
      name,
      description,
      price,
      category,
      brand,
      stock,
      discount,
      images
    );
  
    try {
      // Ensure Mongoose is connected
      if (mongoose.connection.readyState !== 1) {
        throw new Error("Database connection not established");
      }
  
      // Create new product
      const newProduct = new ProductModel({
        name,
        description,
        price,
        category,
        brand,
        stock,
        images,
      });
      await newProduct.save();
      console.log("new Product", newProduct);
  
      // Find the seller by ID
      const getSeller = await SellerModel.findById(id);
      if (!getSeller) {
        throw new Error("Seller not found");
      }
      console.log("getSeller :: ", getSeller);
  
      // Update seller's products array
      getSeller.products.push(newProduct._id);
      await getSeller.save();
  
      // If discount information is provided, create a discount for the product
      if (discount) {
        const discountOnProduct = new DiscountModel({
          name: discount.name,
          description: discount.description,
          discountPercentage: discount.discountPercentage,
          startDate: discount.startDate,
          endDate: discount.endDate,
          products: newProduct._id,
        });
        await discountOnProduct.save();
        console.log("new discountOnProduct", discountOnProduct);
  
        newProduct.discount = discountOnProduct._id;
        await newProduct.save();
        console.log("newProduct", newProduct);
      }
  
      res.send({
        success: true,
        message: "Product Added Successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  };
  const getSellerFullData = async (req, res) => {
    try {
      const { sellerId } = req.body;
      console.log("seller", sellerId);
      const sellerData = await SellerModel.findOne({ _id: sellerId }).populate({
        path: "products",
        populate: [{ path: "category" }, { path: "reviews" }, { path: "likes" }],
      });
  
      return res.send({
        success: true,
        message: "Data fetched",
        sellerData,
      });
    } catch (err) {
      res.send({
        success: false,
        message: err.message,
      });
    }
  };
module.exports = {
    addNewProduct,
    getSellerFullData
}