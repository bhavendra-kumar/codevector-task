require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./src/config/database");
const productRoutes = require("./src/routes/productRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});