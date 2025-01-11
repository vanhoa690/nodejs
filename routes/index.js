import { Router } from "express";
import productRouter from "./productRouter";

const router = Router();

router.use("/products", productRouter);
// router.use("/auth", authRouter);

export default router;
