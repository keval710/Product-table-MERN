import { Request, Response } from "express";
import { User } from "../model/Schema";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const data = await User.find({});

    if (data) {
      return res.status(200).json({ data: data });
    } else {
      return res.status(400).json({ error: "products not found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error });
  }
};
