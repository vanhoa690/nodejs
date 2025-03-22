import { Router } from "express";
import productRouter from "./productRouter";
import authRouter from "./authRouter";
import vnpayRouter from "./vnpay";
import orderRouter from "./orderRouter";

const router = Router();

router.get("/", function (req, res) {
  res.send("hello Homepage");
});

router.use("/products", productRouter);
router.use("/auth", authRouter);
router.use("/", vnpayRouter);
router.use("/orders", orderRouter);

export default router;
