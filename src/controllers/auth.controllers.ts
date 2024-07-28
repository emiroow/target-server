import { Request, Response } from "express";
import { IUser } from "src/interface/IUser";
import { userModel } from "../../src/models/user";

export const registerController = async (req: Request, res: Response) => {
  try {
    const { user, fullName, email }: IUser = req.body;

    // Check if the user already exists
    const isExistUser = await userModel.findOne({
      $or: [{ user }, { fullName }, { email }],
    });

    if (isExistUser) {
      return res
        .status(409)
        .json({ message: "User already exists", status: false });
    }

    // Create a new user if no user exists
    const newUser = await userModel.create(req.body);
    return res.status(201).json({ user: newUser, status: "success" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error", status: false });
  }
};
