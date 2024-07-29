import { NextFunction, Request, Response } from "express";
import { responseHandler } from "../../src/utils/common/responseHandler";

export const notFound = () => {
  throw new Error("Page Not Found !");
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return responseHandler({
    res,
    responseCode: 500,
    status: false,
    massage: err.message,
    data: { stack: err.stack },
  });
};
