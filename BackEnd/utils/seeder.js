const product = require("../models/product");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const products = require("../data/products");

// Setting dotenv file
dotenv.config({ path: "BackEnd/config/config.env" });

connectDatabase();

const seedProduct = async () => {
  try {
    console.log("Clearing Product Collection...");
    await product.deleteMany();
    console.log("Product Collection Cleared");

    console.log("Inserting Products...");
    for (const prod of products) {
      // Creating a new product instance and skipping validation
      const newProduct = new product(prod);
      await newProduct.save({ validateBeforeSave: false });
    }
    console.log("Product Collection Updated");

    process.exit();
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
};

seedProduct();
