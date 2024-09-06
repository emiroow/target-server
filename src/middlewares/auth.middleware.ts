import { NextFunction, Response } from "express";
import { IUser } from "../../src/interface/IUser";
import { userModel } from "../../src/models/user";
import { request } from "../types/request";
import { responseHandler } from "../utils";
import { verifyJwtToken } from "../utils/helper/token.helper";
export const checkUserAuthentication = async (
  req: request,
  res: Response,
  next: NextFunction
) => {
  const Authorization = req.headers.authorization;

  if (!Authorization || !Authorization.includes("Bearer")) {
    return responseHandler({
      res,
      massage: "مشکل احرازهویت !",
      responseCode: 401,
      status: false,
    });
  }
  const jwtToken = Authorization.split("Bearer ")[1];

  const userId = await verifyJwtToken(jwtToken, res);

  const user = (await userModel.findById(userId).lean()) as IUser;

  if (!user) throw new Error("authentication error !");

  req.user = user;

  next();
};
