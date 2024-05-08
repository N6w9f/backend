import mongoose from "mongoose";
import { MEN, WOMEN, KIDS } from "../utils/categories.js";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: [true, `You either write ${MEN} ${WOMEN} or ${KIDS}`],
    enum: [MEN, WOMEN, KIDS],
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  sizes: {
    type: [String],
    required: true,
  },
  image: {
    type: String,
    required: [true, `You got to upload an image`],
  },
  tags: {
    type: [String],
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Products = mongoose.model("products", productsSchema);
export default Products;
