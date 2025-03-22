import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderId: String, // Mã đơn hàng
    products: [
      {
        name: String, // Tên sản phẩm
        price: Number, // Giá sản phẩm
        quantity: Number, // Số lượng
      },
    ],
    totalAmount: Number, // Tổng tiền
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
