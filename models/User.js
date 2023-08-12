import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: [{ 
	  type: mongoose.Schema.ObjectId, 
	  ref: "Product",
	  default:null
	}],
});

export const userModel = mongoose.model("User", userSchema);
