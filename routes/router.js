import express from "express";
import {productModel, cartModel} from "../models/models.js";
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productModel.find()
  res.json({products})
});

router.get("/cart", async (req, res) => {
  const products = await cartModel.find();
  res.json({products})
});

router.post("/insert", async (req, res) => {
  const {name, description, price, countInStock, imageURL} = req.body;
  if(!name || !description || !price || !countInStock || !imageURL){
    res.json({message : "please fill all data"})
  }
  const product = await productModel.create({
    name, description, price, countInStock, imageURL
  });
  res.json({message : "product create successfully", product})
});

router.post("/addtocart", async (req, res) => {
  const {name, description, price, countInStock, imageURL} = req.body;
  const cartProduct = await cartModel.create({
    name, description, price, countInStock, imageURL
  });
  res.json({message : "add to cart successfully", cartProduct})
});

router.delete("/:id", async (req, res) => {
  await cartModel.findByIdAndDelete(req.params.id);
  res.status(200).json("Deleted from cart an entry");
});

router.delete("/", async (req, res) => {
  await productModel.deleteMany({});
  await cartModel.deleteMany({});
  res.status(200).json("Deleted all entries");
});

export default router;
