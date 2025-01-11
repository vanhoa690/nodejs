import { Router } from "express";

const productRouter = Router();
//5 routes RESTfull API

productRouter.get("/products", function (req, res) {
  res.send("Product List");
});

productRouter.get("/products/:id", function (req, res) {
  res.send("Product Detail");
});
productRouter.post("/products", function (req, res) {
  res.send("Product Add");
});
productRouter.put("/products/:id", function (req, res) {
  res.send("Product Update");
});
productRouter.delete("/products/:id", function (req, res) {
  res.send("Product Delete");
});

export default productRouter;
