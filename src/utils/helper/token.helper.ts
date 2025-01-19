import { responseHandler } from "@utils/common/responseHandler";
import { Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJwtToken = async (jwtToken: string, res: Response) => {
  try {
    const deCodedJwt = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY
    ) as JwtPayload;
    const userId = deCodedJwt.id;
    return userId;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      responseHandler({
        res,
        massage: "توکن شما منقضی شده است",
        responseCode: 401,
        status: false,
      });
    } else if (error instanceof jwt.JsonWebTokenError) {
      responseHandler({
        res,
        massage: "توکن شما صحیح نمی باشد",
        responseCode: 401,
        status: false,
      });
    } else {
      responseHandler({
        res,
        massage: "توکن شما صحیح نمی باشد",
        responseCode: 401,
        status: false,
      });
    }
  }
};
