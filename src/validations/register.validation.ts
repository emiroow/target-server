import { NextFunction, Request, Response } from "express";
import { userSchema } from "../../src/schemas/user.schema";
import { responseHandler } from "../../src/utils/common/responseHandler";

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("first");
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
