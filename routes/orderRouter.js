import { Router } from "express";
import orderModel from "../models/orderModel";

const orderRouter = Router();

orderRouter.get("/", async (req, res) => {
  const orders = await orderModel.find();
  return res.json(orders);
});

orderRouter.post("/", async (req, res) => {
  const { products } = req.body;

  // Tính tổng tiền đơn hàng
  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Tạo đơn hàng trong database
  const order = await orderModel.create({
    orderId: Date.now().toString(),
    products,
    totalAmount,
    status: "pending",
  });
  return res.json(order);
});

export default orderRouter;
