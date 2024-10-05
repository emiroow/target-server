import { NextFunction, Request, Response } from "express";
import { targetSchema } from "../schemas/validation/target.schema";
import { responseHandler } from "../utils/common/responseHandler";

export const targetValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody = req.body;
    const { error } = targetSchema.validate(reqBody);
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
