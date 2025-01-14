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
  const product = products.find((p) => p.id == id);

  if (!product) {
    return res.staus(404).json({ message: "Product Not Found" });
  }
  res.json(product);
}

function createProduct(req, res) {
  console.log(req.body);
  const { name, price } = req.body;
  //validate
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
  res.send("updateProduct");
}

function deleteProduct(req, res) {
  res.send("deleteProduct");
}

export {
  getAllProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
};
