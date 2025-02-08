// Demo Mock data (sử dụng nếu chưa có database)
const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

function getAllProducts(req, res) {
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

  if (!name || !price) {
    return res.status(400).json({ message: "Name and Price is Required" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
  };
  products.push(newProduct);

  res.json(newProduct);
}

function updateProduct(req, res) {
  const { id } = req.params;
  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  const { name, price } = req.body;

  if (name) product.name = name;
  if (price) product.price = price;

  res.json(product);
}

function deleteProduct(req, res) {
  const { id } = req.params;
  const productIndex = products.findIndex((p) => p.id == id);
  console.log({ productIndex });
  if (productIndex == -1) {
    return res.staus(404).json({ message: "Product Not Found" });
  }
  products.splice(productIndex, 1);
  res.json({ message: "Xoa san pham thanh cong" });
}

export {
  getAllProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
};
