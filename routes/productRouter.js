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
  const data = req.body;
  res.json(data);
});
productRouter.put("/:id", function (req, res) {
  res.send("Hello Product Update");
});
productRouter.delete("/:id", function (req, res) {
  res.send("Hello Product Delete");
});
export default productRouter;
