import express from "express";
import cors from "cors";
import router from "./routes";
import connectMongoDB from "./config/db";
import { seedProducts } from "./config/seeder";
import multer from "multer";
import path from "path";

const app = express();
app.use(cors());

app.use("/uploads", express.static("uploads"));

// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// chay connect DB truoc routes
connectMongoDB("mongodb://127.0.0.1:27017/db_nodejs_ca2");

// chay seeding products
// seedProducts();
// Cấu hình Multer: Lưu file vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: "uploads/", // Thư mục lưu trữ file
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file duy nhất
  },
});

const upload = multer({ storage });
// Route upload ảnh
app.post("/upload", upload.single("file"), (req, res) => {
  res.send({
    message: "Upload thành công!",
    file: req.file,
  });
});
app.use("/", router);

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
