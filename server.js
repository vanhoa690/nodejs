import express from "express";

const app = express();

app.get("/", function (req, res) {
  res.send("Hello NodeJS");
});

app.get("/products", function (req, res) {
  //data product list
  const products = [
    {
      name: "Iphone",
      price: "111",
      id: 1,
    },
    {
      name: "laptop",
      price: "111",
      id: 2,
    },
  ];
  res.json(products);
});

app.get("/products/:id", function (req, res) {
  const id = req.params.id;
  console.log("product id", id);

  //data product list
  const products = [
    {
      name: "Iphone",
      price: "111",
      id: 1,
    },
    {
      name: "laptop",
      price: "111",
      id: 2,
    },
  ];
  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }
  res.json(product);
});

app.get("/login", function (req, res) {
  res.send("Hello Login");
});

app.get("/register", function (req, res) {
  res.send("Hello Register");
});

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
