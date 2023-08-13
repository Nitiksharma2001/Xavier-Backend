import express from "express";
import mongoose from "mongoose";
import router from "./routes/router.js";
import { authRouter } from "./routes/authRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectToMONGO = async () => {
  try {
    await mongoose.connect(process.env.MONGOURI);
    console.log("connected to MONGO Server");
    app.use(router);
    app.use(authRouter);
    app.use(userRouter);
    app.listen(process.env.PORT, () => {
      console.log("Listening to PORT", process.env.PORT || 4000);
    });
  } catch (error) {
    console.log("unable to connect to MONGO Server");
  }
};
connectToMONGO();
