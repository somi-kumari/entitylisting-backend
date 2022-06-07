const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    // let filter = { $and: [{ product_color: { $eq: "Red" } }, { product_size: { $eq: "M" } }] };
    let filter = (req.query.color || req.query.size)?{$and:[]}:{};
    if (req.query.color) {
      
      filter["$and"].push({ product_color: { $eq: req.query.color } });
    }
    if (req.query.size) {
      
      filter["$and"].push({ product_size: { $eq: req.query.size } });
    }

    // console.log(filter["$and"]);
    let page = req.query.page || 1;
    let perPage = req.query.perPage || 20;
    let skip = (page - 1) * perPage;
    let sortData = req.query.sort
      ? {
          product_price: `${req.query.sort == "asc" ? 1 : -1}`,
        }
      : null;
    // console.log(sortData, req.query.sort);
    let totalPage = Math.ceil(
      (await Product.find().countDocuments()) / perPage
    );
    const product = await Product.find(filter)
      .skip(skip)
      .limit(perPage)
      .sort(sortData);

    return res.status(200).send({ product, totalPage });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const product = await Product.create();
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    return res.status(200).send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});
module.exports = router;
