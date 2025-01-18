import mongoose from "mongoose";

// Định nghĩa Schema cho Product

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("Product", productSchema);

export default productModel;
