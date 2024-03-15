import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  id: {
    type: "string",
    require: true,
  },
  productName: {
    type: "string",
    require: true,
  },
  description: {
    type: "string",
    require: true,
  },
  price: {
    type: "string",
    require: true,
  },
  image: {
    type: "string",
    require: true,
  },
});

export const User = mongoose.model("productData", productSchema);
