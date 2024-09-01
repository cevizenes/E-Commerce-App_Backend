import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.status(200).send("<h1>Welcome</h1>");
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log("server start");
});
