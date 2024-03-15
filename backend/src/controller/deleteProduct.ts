import { Request, Response } from "express";
import { User } from "../model/Schema";

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // console.log(id)

    await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({ message: "deleted Successfully" });
  } catch (error: any) {
    throw Error(error);
  }
};
