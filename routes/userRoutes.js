import "dotenv/config";
import express from "express";
import { userModel } from "../models/User.js";
import { productModel } from "../models/models.js";
import jwt from "jsonwebtoken";
export const userRouter = express.Router();
const authMiddleWare = (req, res, next) => {
  const token = req.headers.authorization.slice(7);
  jwt.verify(token, process.env.JWT_kEY, function (err, user) {
    if (err) {
      return res.json({ message: "invalid user" });
    }
    req.user = user;
    next();
  });
};
userRouter.post("/user/:id", authMiddleWare, (req, res) => {
  const productId = req.params.id;
  userModel.findOne({ id: productId }).exec((error, user) => {
    if (error) {
      return res.json({ error });
    }
    user.cart.push(productId);
    user.save();
    return res.json({ message: "product added to cart" });
  });
});
userRouter.delete("/user/cart/:id", authMiddleWare, (req, res) => {
  const productId = req.params.id;
  userModel.findOne({ id: req.user.id }).exec((error, user) => {
    if (error) {
      return res.json({ error });
    }
    console.log(user);
    user.cart.pull(productId);
    user.save();
    return res.json({ message: "product removed from the cart" });
  });
});
userRouter.post("/insert", authMiddleWare, (req, res) => {
  const {name, description, price, countInStock, imageURL} = req.body;
  if(!name || !description || !price || !countInStock || !imageURL){
    res.json({message : "please fill all data"})
  }
  productModel.create({
    name, description, price, countInStock, imageURL
  }).then(product => {
    res.json({message : "product create successfully", product})
  })
  
});
userRouter.get("/user/cart", authMiddleWare, (req, res) => {
  const { name, email } = req.user;
  userModel
    .findOne({ name, email })
    .select("-password")
    .populate("cart")
    .exec((err, user) => {
      if (err) {
        return res.json(err);
      }
      res.json(user);
    });
});
