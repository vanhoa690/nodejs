// 5 routes RESTfull API

import { Router } from "express";

const productRouter = Router();

productRouter.get("/", function (req, res) {
  const query = req.query;
  const priceMin = req.query.priceMin;
  const priceMax = req.query.priceMax;
  //data product list
  const products = [
    {
      name: "laptop",
      price: 11,
      id: 1,
    },
    {
      name: "laptop",
      price: 999,
      id: 2,
    },
  ];
  if (priceMin && priceMax) {
    const productFilter = products.filter(
      (product) => product.price > priceMin && product.price < priceMax
    );
    return res.status(200).json(productFilter);
  }
  res.status(200).json(products);
});
productRouter.get("/:id", function (req, res) {
  const id = req.params.id;
  //data product list
  const products = [
    {
      name: "laptop",
      price: 1,
      id: 1,
    },
    {
      name: "laptop",
      price: 99,
      id: 2,
    },
  ];
  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  res.status(200).json(product);
});
productRouter.post("/", function (req, res) {
  console.log("req body", req.body);
  res.send("Hello Product Add");
});
productRouter.put("/:id", function (req, res) {});
productRouter.delete("/:id", function (req, res) {});

export default productRouter;