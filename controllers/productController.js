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

function createProduct(req, res) {}
function updateProduct(req, res) {}
function deleteProduct(req, res) {}

export {
  getAllProduct,
  getProductDetail,
  createProduct,
  updateProduct,
  deleteProduct,
};
