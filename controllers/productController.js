// name convention: camelCase
const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

function getAllProduct(req, res) {
  // filter req.query
  res.json(products);
}

function getProductDetail(req, res) {
  const { id } = req.params;

  const product = products.find((product) => product.id == id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.json(product);
}

function createProduct(req, res) {
  const { name, price } = req.body;
  // validate
  if (!name || !price) {
    return res.status(400).json({ message: "Name and price is required" });
  }
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);

  res.json(newProduct);
}

function updateProduct(req, res) {
  // tim kiem product co id == :id
  const { id } = req.params;
  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  // update name, price trong product
  const { name, price } = req.body;

  if (name) product.name = name;
  if (price) product.price = price;

  res.json(product);
}
function deleteProduct(req, res) {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id == id);
  console.log(productIndex);

  if (productIndex == -1) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  products.splice(productIndex, 1);
  res.json({ message: `Product ${productIndex} dc xoa khoi products` });
}

export {
  getAllProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
