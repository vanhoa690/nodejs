import { Router } from "express";
import {
  getAllProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductDetail);
productRouter.post("/", createProduct);
productRouter.put("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

export default productRouter;
