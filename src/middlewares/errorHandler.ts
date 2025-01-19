import { responseHandler } from "@utils/common/responseHandler";
import { NextFunction, Request, Response } from "express";

// Correct `notFound` middleware signature
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  throw new Error("Page Not Found!");
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  responseHandler({
    res,
    responseCode: statusCode,
    status: false,
    massage: err.message,
    data: { stack: process.env.NODE_ENV === "production" ? null : err.stack },
  });
};
