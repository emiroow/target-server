import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
    massage: "user create successfully",
    data: newUserObject,
  });
};

export const loginController = async (req: Request, res: Response) => {
  const { user, password } = req.body;

  console.log(req.body);

  const findUser = await userModel.findOne({ user });
  if (!findUser)
    return responseHandler({
      res,
      massage: "user not found !",
      status: false,
      responseCode: 401,
    });

  const checkUserPassword = await hashCompare({
    password,
    hash: findUser.password,
  });
  if (!checkUserPassword)
    return responseHandler({
      res,
      massage: "password is not a correct !",
      status: false,
      responseCode: 401,
    });

  // Remove the password property
  findUser.password = undefined;

  const userId = findUser._id;

  const token = jwt.sign({ id: userId }, "emiroow", { expiresIn: "1h" });

  return responseHandler({
    res,
    massage: "login successfully",
    data: { user: findUser, token },
    status: true,
    responseCode: 200,
  });
};
