import { NextFunction, Request, Response } from "express";
import { userSchema } from "../../src/schemas/user.schema";

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody = req.body;
    const { error } = userSchema.validate(reqBody);
    if (error) {
      return res.status(400).json({
        message: error?.details[0]?.message || [],
        errors: error?.details,
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
