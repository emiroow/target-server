import { Request, Response } from "express";
import { userModel } from "../../src/models/user";

export const getUsersListController = async (req: Request, res: Response) => {
  try {
    const users = await userModel.find().select(["-password"]);
    return res.status(200).json({ users, status: true });
  } catch (error) {
    return res.status(500).json({ error: error, status: false });
  }
};
