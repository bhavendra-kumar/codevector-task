const mongoose = require("mongoose");
const Product = require("../models/Product");

const getProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const category = req.query.category;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (req.query.updatedAt && req.query.id) {
      filter.$or = [
        {
          updatedAt: {
            $lt: new Date(req.query.updatedAt),
          },
        },
        {
          updatedAt: new Date(req.query.updatedAt),
          _id: {
            $lt: new mongoose.Types.ObjectId(
              req.query.id
            ),
          },
        },
      ];
    }

    const products = await Product.find(filter)
      .sort({
        updatedAt: -1,
        _id: -1,
      })
      .limit(limit);

    const lastProduct =
      products[products.length - 1];

    const nextCursor = lastProduct
      ? {
          updatedAt: lastProduct.updatedAt,
          id: lastProduct._id,
        }
      : null;

    res.status(200).json({
      success: true,
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getProducts };