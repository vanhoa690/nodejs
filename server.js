import express from "express";
import cors from "cors";
import router from "./routes";
import connectMongoDB from "./config/db";
import { seedProducts } from "./config/seeder";

const app = express();
app.use(cors());
// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// chay connect DB truoc routes
connectMongoDB("mongodb://127.0.0.1:27017/db_nodejs_ca2");

// chay seeding products
// seedProducts();

app.use("/api", router);

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
