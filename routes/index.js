import { Router } from "express";
import productRouter from "./productRouter";

const router = Router();

router.use("/products", productRouter);

export default router;
