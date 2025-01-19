import { userModel } from "@models/user";
import { responseHandler } from "@utils/common/responseHandler";
import { Request, Response } from "express";

export const getUsersListController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({ users, status: true });
  } catch (error) {
    res
      .status(500)
      .json({ error: error || "Internal Server Error", status: false });
  }
};

export const getUserInfoController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await userModel.findById(req.user._id).select("-password"); // حذف فیلد password
    if (!user) {
      responseHandler({
        res,
        responseCode: 404,
        massage: "User not found!",
        status: false,
      });
    }

    responseHandler({
      res,
      responseCode: 200,
      massage: "Success",
      status: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    responseHandler({
      res,
      responseCode: 500,
      massage: "Internal Server Error",
      status: false,
    });
  }
};
