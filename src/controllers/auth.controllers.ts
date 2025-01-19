import { IUser } from "@interface/IUser";
import { userModel } from "@models/user";
import { responseHandler } from "@utils/common/responseHandler";
import { hashCompare, hashHandler } from "@utils/helper/bcrypt.helper";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const registerController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { user, fullName, email, password }: IUser = req.body;

    // Check if the user already exists
    const isExistUser = await userModel.findOne({
      $or: [{ user }, { fullName }, { email }],
    });

    if (isExistUser) {
      responseHandler({
        res,
        responseCode: 409,
        massage: "User already exists",
        status: false,
      });
    }

    // Hash the password
    const hash = await hashHandler({ salt: 10, text: password });
    req.body.password = hash;

    // Create the user
    const newUser = await userModel.create(req.body);

    // Remove password from the user object before sending response
    const newUserObject = newUser.toObject();
    delete newUserObject.password;

    responseHandler({
      res,
      responseCode: 201,
      massage: "User created successfully",
      status: true,
      data: newUserObject,
    });
  } catch (error) {
    console.error("Error during user registration:", error);

    responseHandler({
      res,
      responseCode: 500,
      massage: "Internal server error",
      status: false,
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { user, password } = req.body;

  try {
    const findUser = await userModel.findOne({ user });
    if (!findUser) {
      responseHandler({
        res,
        massage: "کاربر یافت نشد !",
        status: false,
        responseCode: 404,
      });
    }

    const checkUserPassword = await hashCompare({
      password,
      hash: findUser.password,
    });
    if (!checkUserPassword) {
      responseHandler({
        res,
        massage: "رمز عبور صحیح نمی باشد",
        status: false,
        responseCode: 401,
      });
    }

    // Remove the password property
    findUser.password = undefined;

    const userId = findUser._id;

    const token = jwt.sign({ id: userId }, "emiroow", { expiresIn: "1h" });

    responseHandler({
      res,
      massage: "با موفقیت وارد شدید",
      data: { user: findUser, token },
      status: true,
      responseCode: 200,
    });
  } catch (err) {
    console.error("Login error:", err);
    responseHandler({
      res,
      massage: "خطای سرور داخلی",
      status: false,
      responseCode: 500,
    });
  }
};
