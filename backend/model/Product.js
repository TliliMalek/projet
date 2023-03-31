const mongoose = require("mongoose");
const productschema = new mongoose.Schema({
  name: String,
  price: Number,
  qtes: Number,
  description: String,
  category: [String],
  size: [String],
  color: [String],
  disponible: { type: Boolean, default: true },
  img: String,
  user: { type: mongoose.Types.ObjectId, ref: "user" }
});
const product = mongoose.model("product", productschema);
module.exports = product;
