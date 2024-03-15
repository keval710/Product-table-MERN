import { Request, Response } from "express";
import { User } from "../model/Schema";

export const addProducts = async (req: Request, res: Response) => {
  const { id, productName, description, price } = req.body;
  // console.log(req.file);

  try {
    const product = new User({
      id,
      productName,
      description,
      price,
      image: req.file?.filename,
    });

    const saveProduct = await product.save();

    if (saveProduct) {
      return res.status(201).json({ message: "Product added successfully" });
    } else {
      return res.status(422).json({ error: "product not added" });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
