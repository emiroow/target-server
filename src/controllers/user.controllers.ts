import { Request, Response } from "express";
import { userModel } from "../models/users";

export const getUserInfoController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (user) {
    return res.status(200).json({ user, status: true });
  } else {
    return res.status(404).json({ error: "zart", status: false });
  }
};

export const getUsersListController = async (req: Request, res: Response) => {
  const users = await userModel.find({});
  return res.status(200).json({ users, status: true });
};

export const createUserController = async (req: Request, res: Response) => {
  console.log(req.body);
  const user = await userModel.create(req.body);
  return res.status(201).json({ user, status: true });
};
