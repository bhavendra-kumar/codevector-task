require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../src/models/Product");

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Sports",
  "Furniture",
];

async function seedProducts() {
  await mongoose.connect(process.env.MONGODB_URL);

  const batchSize = 5000;

  for (let i = 0; i < 200000; i += batchSize) {
    const products = [];

    for (let j = 0; j < batchSize; j++) {
      products.push({
        name: `Product ${i + j}`,
        category:
          categories[
            Math.floor(Math.random() * categories.length)
          ],
        price: Math.floor(Math.random() * 5000),
      });
    }

    await Product.insertMany(products);

    console.log(`Inserted ${i + batchSize} Products`);
  }

  console.log("Completed Adding Products");

  process.exit();
}

seedProducts();