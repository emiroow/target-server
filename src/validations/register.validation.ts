import { userSchema } from "@schemas/validation/user.schema";
import { responseHandler } from "@utils/common/responseHandler";
import { NextFunction, Request, Response } from "express";

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reqBody = req.body;
    const { error } = userSchema.validate(reqBody);
    if (error) {
      responseHandler({
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
