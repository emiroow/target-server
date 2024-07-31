import { Request, Response } from "express";
import { IUser } from "../../src/interface/IUser";
import { userModel } from "../../src/models/user";
import { responseHandler } from "../../src/utils/common/responseHandler";
import { hashCompare, hashHandler } from "../utils/helper/bcrypt.helper";

export const registerController = async (req: Request, res: Response) => {
  const { user, fullName, email, password }: IUser = req.body;

  // Check if the user already exists
  const isExistUser = await userModel.findOne({
    $or: [{ user }, { fullName }, { email }, { password }],
  });

  if (isExistUser) throw new Error("User already exists");

  const hash = await hashHandler({ salt: 10, text: password });
  req.body.password = hash;

  const newUser = await userModel.create(req.body);

  // remove Password from obj
  const newUserObject = newUser.toObject();
  delete newUserObject.password;

  return responseHandler({
    res,
    responseCode: 201,
    massage: "success",
    data: newUserObject,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  const findUser = await userModel.findOne({ $or: [{ user }, { password }] });
  if (!findUser) throw new Error("user notFound !");

  const checkUserPassword = await hashCompare({
    password,
    hash: findUser.password,
  });
  if (!checkUserPassword) throw new Error("password is not a correct !");

  // Remove the password property
  findUser.password = undefined;

  return responseHandler({
    res,
    massage: "login successfully",
    data: { user: findUser, token: "" },
    status: true,
    responseCode: 200,
  });
};