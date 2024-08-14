import { Response } from "express";
import { Error } from "mongoose";
import { userModel } from "../../src/models/user";
import { request } from "../../src/types/request";
import { responseHandler } from "../utils/common/responseHandler";

export const getUsersListController = async (req: request, res: Response) => {
  try {
    const users = await userModel.find().select(["-password"]);
    return res.status(200).json({ users, status: true });
  } catch (error) {
    return res.status(500).json({ error: error, status: false });
  }
};

export const getUserInfoController = async (req: request, res: Response) => {
  const user = await userModel.findById(req.user._id).select(["-password"]);
  if (!user) throw new Error("user not found !");
  return responseHandler({
    res,
    massage: "success",
    status: true,
    data: user,
    responseCode: 200,
  });
};
