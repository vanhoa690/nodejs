import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.send("Hello NodeJS");
});

if (import.meta.env.PROD) app.listen(3000);

export const viteNodeApp = app;
