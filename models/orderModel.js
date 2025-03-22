import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    orderId: String, // Mã đơn hàng
    user: {
      username: String, // Tên người dùng
      address: String, // Địa chỉ nhận hàng
      phone: String, // Số điện thoại
    },
    products: [
      {
        name: String, // Tên sản phẩm
        price: Number, // Giá sản phẩm
        quantity: Number, // Số lượng
      },
    ],
    totalAmount: Number, // Tổng tiền
    paymentMethod: {
      type: String,
      enum: ["vnpay", "zalopay", "cod"], // Phương thức thanh toán
      required: true,
    },
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
