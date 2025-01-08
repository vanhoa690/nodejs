import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello NodeJS");
});

app.post("/products", function (req, res) {
  console.log("req.body", req.body);
  res.send("Hello Add Product");
});

app.get("/products", function (req, res) {
  // data
  const products = [
    { id: 1, name: "Iphone 16", price: 10 },
    { id: 2, name: "Iphone 17", price: 101 },
    { id: 3, name: "Iphone 18", price: 1000 },
  ];
  const price = req.query.price;
  if (price) {
    const filterProduct = products.filter((product) => product.price > price);
    return res.json(filterProduct);
  }
  res.json(products);
});

app.get("/products/:id", function (req, res) {
  const products = [
    { id: 1, name: "Iphone 16", price: 1000 },
    { id: 2, name: "Iphone 17", price: 1000 },
    { id: 3, name: "Iphone 18", price: 1000 },
  ];
  const id = req.params.id;
  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  res.json(product);
});

app.get("/login", function (req, res) {
  res.send("Hello login");
});

app.get("/register", function (req, res) {
  res.send("Hello register");
});

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
