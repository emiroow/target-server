import { NextFunction, Request, Response } from "express";

export const uploadValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
    // const reqBody = req.body;
    // const { error } = uploadSchema.validate(reqBody);
    // if (error) {
    //   return responseHandler({
    //     res,
    //     massage: error?.details[0]?.message,
    //     status: false,
    //     responseCode: 400,
    //     data: error?.details,
    //   });
    // }
    next();
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
