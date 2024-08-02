import { NextFunction, Request, Response } from "express";
import { loginSchema } from "../../src/schemas/login.schema";
import { responseHandler } from "../../src/utils/common/responseHandler";

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody = req.body;
    const { error } = loginSchema.validate(reqBody);
    if (error) {
      return responseHandler({
        res,
        massage: error?.details[0]?.message,
        status: false,
        responseCode: 401,
        data: error?.details,
      });
    }
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(401).json({
      message: "Internal server error",
    });
  }
};
