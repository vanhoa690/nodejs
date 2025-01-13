import express from "express";
import cors from "cors";
import router from "./routes";
import mongoose from "mongoose";

const app = express();
app.use(cors());

// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function connectMongoDB() {
  try {
    //mongodb://127.0.0.1:27017/db_name
    await mongoose.connect("mongodb://127.0.0.1:27017/db_node_sp25");
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!!");
  }
}

connectMongoDB();

app.use("/", router);

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
