const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the Product Name"],
    trim: true,
    maxLength: [500, "Product Name must not exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please enter the Product Price"],
    maxLength: [5, "Product Price must not exceed 5 digits"],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "Please enter the Product Description"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please enter the Product Category"],
    enum: {
      values: [
        "Electronics",
        "Fashion",
        "Home and Kitchen",
        "Books",
        "Sports and Outdoors",
        "Toys",
        "Groceries",
        "Health and Beauty",
        "Other",
      ],
      message:
        "Invalid category: please select a valid category for this product",
    },
  },
  seller: {
    type: String,
    required: [true, "Please enter the Product Seller"],
  },
  stock: {
    type: Number,
    required: [true, "Please enter the Product Quantity Available"],
    max: [1000, "Product Quantity must not exceed 1000"],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
        maxLength: [500, "Review comment must not exceed 500 characters"],
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
