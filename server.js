import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
app.use(cors());

// Middleware để phân tích JSON và form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.send("hello Homepage");
});

app.use("/", router);

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
