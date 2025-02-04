import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  size: {
    type: Array,
    required: true,
  },
  color: {
    type: Array,
    required: true,
  },

  image: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\..+/, "Please upload a valid image file (JPG, JPEG, PNG)"],
  },
});

export const Product = mongoose.model("Product", productSchema);
