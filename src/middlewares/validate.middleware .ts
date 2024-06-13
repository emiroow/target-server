import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "yup";

export const validate =
  (schema: ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = await schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
      });
      next();
    } catch (err) {
      return res.status(400).json({
        message: "Validation failed",
        //   errors: err.inner.map((error: any) => ({
        //     path: error.path,
        //     message: error.message
        //   })),
      });
    }
  };
