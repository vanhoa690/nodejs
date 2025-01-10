import { Router } from "express";
import productRouter from "./productRouter";
import authRouter from "./authRouter";

const router = Router();

router.get("/", function (req, res) {
  res.send("Hello Homepage");
});

router.use("/products", productRouter);
router.use("/auth", authRouter);

export default router;
