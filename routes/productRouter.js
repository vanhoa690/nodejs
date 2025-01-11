import { Router } from "express";

const productRouter = Router();
//5 routes RESTfull API

productRouter.get("/", function (req, res) {
  res.send("Product List");
});

productRouter.get("/:id", function (req, res) {
  res.send("Product Detail");
});
productRouter.post("/", function (req, res) {
  res.send("Product Add");
});
productRouter.put("/:id", function (req, res) {
  res.send("Product Update");
});
productRouter.delete("/:id", function (req, res) {
  res.send("Product Delete");
});

export default productRouter;
