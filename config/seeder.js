import { faker } from "@faker-js/faker";
import productModel from "./models/productModel";

export const seedProducts = async () => {
  try {
    await productModel.deleteMany(); // Xóa toàn bộ dữ liệu cũ
    console.log("🗑️ Đã xóa toàn bộ sản phẩm cũ!");
    let products = [];
    for (let i = 0; i < 10; i++) {
      products.push({
        name: faker.commerce.productName(),
        price: faker.commerce.price(10, 1000, 0), // Giá từ 10 đến 1000
      });
    }
    await productModel.insertMany(products);
    console.log("✅ Đã chèn dữ liệu sản phẩm thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi chèn dữ liệu:", error);
  }
};
