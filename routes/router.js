import express from "express";
import {productModel, cartModel} from "../models/models.js";
import "dotenv/config";
const router = express.Router();
router.get("/", (req, res) => {
  productModel.find().exec((err, products) => {
    if(err){
      return res.json({err})
    }
    return res.json({products})
  })
});
router.get("/view/:id", (req, res) => {
  cartModel.findOne({id: req.params.id}).exec((err, product) => {
    if(err){
      return res.json({err})
    }
    return res.json({product})
  })
});

export default router;
