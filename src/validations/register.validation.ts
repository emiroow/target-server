import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../../src/utils/common/responseHandler";
import { userSchema } from "../schemas/validation/user.schema";

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody = req.body;
    const { error } = userSchema.validate(reqBody);
    if (error) {
      return responseHandler({
        res,
        massage: error?.details[0]?.message,
        status: false,
        responseCode: 400,
        data: error?.details,
      });
    }
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
