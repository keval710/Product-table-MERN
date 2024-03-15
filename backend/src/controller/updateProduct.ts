import { Request, Response } from "express";
import { User } from "../model/Schema";
import fs from "fs";

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id, productName, description, price } = req.body;

    const existingProduct = await User.find({ id: id });
    console.log(existingProduct);
    if (existingProduct[0].image !== req.file?.filename) {
      fs.unlink(`./images/${existingProduct[0].image}`, () => {
        console.log("File deleted successfully");
      });
    }

    if (existingProduct) {
      await User.findOneAndUpdate(
        { id: id },
        { productName, description, price, image: req.file?.filename }
      );

      return res.status(200).json({ message: "Updated Successfully" });
    } else {
      return res.status(404).json({ message: "data not found" });
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
