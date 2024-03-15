import express from "express";
import { addProducts } from "../controller/addProduct";
import multer from "multer";
import { getProducts } from "../controller/getProducts";
import { deleteProduct } from "../controller/deleteProduct";
import { updateProduct } from "../controller/updateProduct";

const route = express.Router();

const storage = multer.diskStorage({
  destination: (
    req,
    file,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, "./images");
  },
  filename: (
    req,
    file,
    cb: (error: Error | null, filename: string) => void
  ) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

route.post("/addProduct", upload.single("image"), addProducts);
route.get("/products", getProducts);
route.put("/updateProduct", upload.single("image"), updateProduct);
route.delete("/delete/:id", deleteProduct);

export default route;
