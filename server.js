import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("Hello NodeJS");
});

app.get("/products", function (req, res) {
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

app.get("/products/:id", function (req, res) {
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

app.post("/products", function (req, res) {
  console.log("req body", req.body);
  res.send("Hello Product Add");
});

app.get("/login", function (req, res) {
  res.send("Hello Login");
});

app.get("/register", function (req, res) {
  res.send("Hello Register");
});

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
