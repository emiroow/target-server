import { Response } from "express";

export const responseHandler = ({
  res,
  responseCode = 200,
  status = true,
  data,
  massage,
}: {
  res: Response;
  responseCode?: number;
  status?: boolean;
  data?: any;
  massage?: string;
}) => {
  return res.status(responseCode).json({ massage, status, data });
};
