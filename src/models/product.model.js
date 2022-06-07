const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    product_title: { type: String, required: true },
    product_image: [{ type: String, required: true }],
    product_color: [{ type: String, required: true }],
    product_size: [{ type: String, required: true }],
    product_price: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);
const Product = mongoose.model("product", productSchema);
module.exports = Product;
