// Demo Mock data (sử dụng nếu chưa có database)

import productModel from "../models/productModel";

const products = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
];

async function getAllProducts(req, res) {
  try {
    const productList = await productModel.find(); // SQL: select * from products
    res.json(productList);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

async function getProductDetail(req, res) {
  try {
    const { id } = req.params;

    const product = await productModel.findById(id); //SQL: select * form products where product.id === id

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
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

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const deleteProduct = await productModel.findByIdAndDelete(id); //find(id) + delete Product

    console.log(deleteProduct);

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json({ message: "Xoa san pham thanh cong" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server Error" });
  }
}

export {
  getAllProducts,
  getProductDetail,
  updateProduct,
  createProduct,
  deleteProduct,
};
