import express from "express";
import { productModel } from "../models/models.js";
import "dotenv/config";
const router = express.Router();
router.get("/", (req, res) => {
  productModel.find((err, products) => {
    if (err) {
      return res.json({ err });
    }
    return res.json({ products });
  });
});
router.get("/view/:id", (req, res) => {
  const productId = req.params.id
  productModel.findOne({ _id: productId }, (err, product) => {
    if (err) {
      return res.json({ err });
    }
    return res.json({ product });
  });
});

export default router;
