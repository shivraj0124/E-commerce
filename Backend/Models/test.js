// const mongoose = require("mongoose");

// const productSchema = new Schema(
//   {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     price: { type: Number, required: true },
//     category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
//     brand: { type: String, required: true },
//     stock: { type: Number, required: true },
//     discount: { type: Number, default: 0 },
//     ratings: { type: Number, default: 0 },
//     numReviews: { type: Number, default: 0 },
//     images: [{ type: String, required: true }],
//     likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
//     reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
//   },
//   { timestamps: true }
// );
// const reviewSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
//     rating: { type: Number, required: true },
//     title: { type: String, required: true },
//     desc: { type: String, required: true },
//   },
//   { timestamps: true }
// );

// const likeSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
//   },
//   { timestamps: true }
// );

// const categorySchema = new Schema(
//   {
//     name: { type: String, required: true, unique: true },
//     description: { type: String, required: true },
//     keyword: [{ type: String, required: true }],
//   },
//   { timestamps: true }
// );

// const orderSchema = new Schema(
//   {
//     user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     orderItems: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: { type: Number, required: true },
//         price: { type: Number, required: true },
//       },
//     ],

//     paymentMethod: { type: String, required: true },
//     paymentResult: {
//       id: { type: String },
//       status: { type: Boolean },
//       update_time: { type: String },
//       email_address: { type: String },
//     },
//     shippingAddress: {
//       address: { type: String, required: true },
//       city: { type: String,required:true },
//       pinCode: { type: String,required:true },
//       state: { type: String,required:true },
//     },

//     totalPrice: { type: Number, required: true },
//     // isPaid: { type: Boolean, default: false },
//     isDelivered: { type: Boolean, default: false },
//     deliveredAt: { type: Date },
//   },
//   { timestamps: true }
// );


// // const mongoose = require("mongoose");

// // const productSchema = new mongoose.Schema({
// //   name: {
// //     type: String,
// //     required: true,
// //   },
// //   MRP: {
// //     type: Number,
// //     required: true,
// //   },
// //   price: {
// //     type: Number,
// //     require: true,
// //   },
// //   images: {
// //     type: Array,
// //     required: true,
// //   },
// //   inventory: {
// //     type: Number,
// //     required: true,
// //   },
// //   desc: {
// //     type: Number,
// //     required: true,
// //   },
// //   features: {
// //     type: Number,
// //     required: true,
// //   },
// //   reviews: [
// //     {
// //       user: { type: Schema.Types.ObjectId, ref: "User", required: true },
// //       rating: {
// //         type: Number,
// //         required: true,
// //       },
// //       title: { type: String, required: true },
// //       desc: {
// //         type: String,
// //       },
// //     },
// //   ],
// // });
// // const product = new mongoose.model("product", productSchema);

// // module.exports = product;


// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     phone: {
//       type: Number,
//       required: true,
//     },
//     favourites: {
//       type: [Schema.Types.ObjectId],
//     },
//     cart: {
//       type: [Schema.Types.ObjectId],
//     },
//     shippingAddress: {
//       address: { type: String },
//       city: { type: String },
//       pinCode: { type: String },
//       state: { type: String },
//     },
//   },
//   { timestamps: true }
// );


// const handleLogin=async(req,res)=>{
//     try{

//     }catch(err){
//         res.send({
//             success:false,
//             message:err.message
//         })
//     }
// }