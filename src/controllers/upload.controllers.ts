import { Response } from "express";
import { fileModel } from "../models/file";
import { request } from "../types/request";
import { responseHandler } from "../utils";

export const createUploadController = async (req: request, res: Response) => {
  const userId = req.user._id;
  const formDataName = req.body.name;
  let user = req.user.user;
  if (req.file) {
    return responseHandler({
      res,
      data: {
        name: formDataName,
        url: `${user}-${userId}-${req.file.originalname.split(" ").join("")}`,
      },
      status: true,
      responseCode: 201,
      massage: "عکس شما با موفقیت آپلود گردید",
    });
  }
};

export const getUploadListController = async (req: request, res: Response) => {
  const uploadList = await fileModel.find({ user: req.user._id });
  return responseHandler({
    res,
    data: uploadList,
    status: true,
    responseCode: 200,
  });
};
