const mongoose = require("mongoose");
const reviewshema = new mongoose.Schema({
  rate: { type: Number, default: 0 },
  comment: { type: String },
  product: { type: mongoose.Types.ObjectId, ref: "product" },
  user: String,
});
const review = mongoose.model("review", reviewshema);
module.exports = review;
