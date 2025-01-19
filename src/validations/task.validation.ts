import { taskSchema } from "@schemas/validation/task.schema";
import { responseHandler } from "@utils/common/responseHandler";
import { NextFunction, Request, Response } from "express";

export const taskValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reqBody = req.body;
    const { error } = taskSchema.validate(reqBody);
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
