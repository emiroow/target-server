import { boardSchema } from "@schemas/validation/board.schema";
import { responseHandler } from "@utils/common/responseHandler";
import { NextFunction, Request, Response } from "express";

export const boardValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody = req.body;
    const { error } = boardSchema.validate(reqBody);
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
      message: "مشکلی در سرور رخ داده است",
    });
  }
};
