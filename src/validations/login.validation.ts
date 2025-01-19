import { loginSchema } from "@schemas/validation/login.schema";
import { responseHandler } from "@utils/common/responseHandler";
import { NextFunction, Request, Response } from "express";

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const reqBody = req.body;
    const { error } = loginSchema.validate(reqBody);

    if (error) {
      responseHandler({
        res,
        massage: error?.details[0]?.message || "Validation error",
        status: false,
        responseCode: 401,
        data: error?.details,
      });
    }

    next(); // اگر اعتبارسنجی موفق بود، به متد بعدی بروید
  } catch (err) {
    console.error("Validation error:", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
