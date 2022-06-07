const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
app.use(cors());
const productController = require("./controllers/product.controller");

app.get("/", (req, res) => {
  try {
    res.status(200).send("welcome to simple-store.com");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
app.use('/product',productController)
module.exports = app;
