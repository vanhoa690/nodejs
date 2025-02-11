import productModel from "../models/productModel";

// Demo Mock data (sử dụng nếu chưa có database)
const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

async function getAllProducts(req, res) {
  try {
    const productList = await productModel.find();
    res.json(productList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getProductDetail(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function createProduct(req, res) {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and Price is Required" });
    }
    const productCreated = await productModel.create(req.body);
    res.status(201).json(productCreated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id); // tim kiem id -> xoa
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json({ message: "Xoa san pham thanh cong" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export {
  getAllProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
};
