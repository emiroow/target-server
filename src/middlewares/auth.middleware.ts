import { NextFunction, Response } from "express";
import { IUser } from "../../src/interface/IUser";
import { userModel } from "../../src/models/user";
import { request } from "../types/request";
import { verifyJwtToken } from "../utils/helper/token.helper";
export const checkUserAuthentication = async (
  req: request,
  res: Response,
  next: NextFunction
) => {
  const Authorization = req.headers.authorization;

  if (!Authorization || !Authorization.includes("Bearer")) {
    throw new Error("مشکل احرازهویت !");
  }
  const jwtToken = Authorization.split("Bearer ")[1];

  const userId = await verifyJwtToken(jwtToken);

  const user = (await userModel.findById(userId).lean()) as IUser;

  if (!user) throw new Error("authentication error !");

  req.user = user;

  next();
};
