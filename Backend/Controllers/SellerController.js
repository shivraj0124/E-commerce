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
      return res.send({ success: false, message: "Seller not found" });
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

const updateProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    category,
    brand,
    stock,
    images,
    productId,
  } = req.body;

  try {
    // Ensure the productId is provided
    if (!productId) {
      return res.status(400).send({
        success: false,
        message: "Product ID is required.",
      });
    }

    // Build the update object dynamically
    const updateData = {
      ...(name && { name }),
      ...(description && { description }),
      ...(price && { price }),
      ...(category && { category }),
      ...(brand && { brand }),
      ...(stock && { stock }),
    };

    // Add images if provided
    if (Array.isArray(images) && images.length > 0) {
      updateData.$push = { images: { $each: images } };
    }

    // Update the product in the database
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true } // Options: return the updated document
    );

    // Handle the case where the product is not found
    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: "Product not found.",
      });
    }

    return res.send({
      success: true,
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (err) {
    console.error("Error updating product:", err.message);
    return res.status(500).send({
      success: false,
      message: "An error occurred while updating the product.",
    });
  }
};

const addDiscount = async (req, res) => {
  const {
    name,
    description,
    discountPercentage,
    startDate,
    endDate,
    productId,
  } = req.body;
  try {
    const discountOnProduct = new DiscountModel({
      name: name,
      description: description,
      discountPercentage: discountPercentage,
      startDate: startDate,
      endDate: endDate,
      products: productId,
    });
    await discountOnProduct.save();
    let newProduct = await ProductModel.findById(productId);
    console.log("new discountOnProduct", newProduct);
    newProduct.discount = discountOnProduct._id;
    await newProduct.save();
    console.log("newProduct", newProduct);
    res.send({
      success: true,
      message: "Discount Added Successfully",
      discount: discountOnProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  addNewProduct,
  getSellerFullData,
  updateProduct,
  addDiscount
};
