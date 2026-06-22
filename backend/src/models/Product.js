const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: String,
    category: String,
    price: Number,
  },
  {
    timestamps: true,
  }
);

productSchema.index({
  updatedAt: -1,
  _id: -1,
});

module.exports = mongoose.model("Product", productSchema);