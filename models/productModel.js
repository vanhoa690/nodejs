import mongoose from "mongoose";

// Định nghĩa Schema cho Product
const productShema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"], //true
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
});

const ProductModel = mongoose.model("Product", productShema); //db: products

export default ProductModel;
