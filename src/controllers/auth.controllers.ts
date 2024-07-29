import { Request, Response } from "express";
import { IUser } from "../../src/interface/IUser";
import { userModel } from "../../src/models/user";
import { responseHandler } from "../../src/utils/common/responseHandler";

export const registerController = async (req: Request, res: Response) => {
  const { user, fullName, email }: IUser = req.body;

  // Check if the user already exists
  const isExistUser = await userModel.findOne({
    $or: [{ user }, { fullName }, { email }],
  });

  if (isExistUser) throw new Error("User already exists");

  const newUser = await userModel.create(req.body);
  return responseHandler({
    res,
    responseCode: 201,
    massage: "success",
    data: newUser,
  });
};
