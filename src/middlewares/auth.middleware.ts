import { IUser } from "@interface/IUser";
import { userModel } from "@models/user";
import { responseHandler } from "@utils/common/responseHandler";
import { verifyJwtToken } from "@utils/helper/token.helper";
import { NextFunction, Request, Response } from "express";

export const checkUserAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const Authorization = req.headers.authorization;

    if (!Authorization || !Authorization.startsWith("Bearer ")) {
      responseHandler({
        res,
        massage: "مشکل احرازهویت !",
        responseCode: 401,
        status: false,
      });
    }

    const jwtToken = Authorization.split("Bearer ")[1]?.trim();
    if (!jwtToken) {
      responseHandler({
        res,
        massage: "توکن معتبر نیست!",
        responseCode: 401,
        status: false,
      });
    }

    const userId = await verifyJwtToken(jwtToken, res);
    const user = (await userModel.findById(userId).lean()) as IUser;

    if (!user) {
      responseHandler({
        res,
        massage: "کاربر یافت نشد!",
        responseCode: 401,
        status: false,
      });
    }

    req.user = user;
    next(); // Call next() to proceed to the next middleware or route handler
  } catch (error) {
    next(error); // Pass the error to Express' error handling middleware
  }
};
