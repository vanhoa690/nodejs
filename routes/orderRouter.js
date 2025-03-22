import { Router } from "express";
import orderModel from "../models/orderModel";
import axios from "axios";

const orderRouter = Router();

orderRouter.get("/", async (req, res) => {
  const orders = await orderModel.find();
  return res.json(orders);
});

orderRouter.post("/", async (req, res) => {
  const { user, products, paymentMethod } = req.body;

  // Tính tổng tiền đơn hàng
  const totalAmount = products.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  console.log(totalAmount);

  const orderId = Date.now().toString();
  // Tạo đơn hàng trong database
  const order = await orderModel.create({
    orderId,
    user,
    products,
    totalAmount,
    paymentMethod,
    status: "pending",
  });

  const response = await axios.get(
    `http://localhost:3000/create_payment_url?amount=${totalAmount}&orderId=${orderId}`,
    {
      headers: { "Content-Type": "application/json" },
    }
  );

  return res.json(response.data);
});

export default orderRouter;
