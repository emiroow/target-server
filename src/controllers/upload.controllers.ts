import { fileModel } from "@models/file";
import { responseHandler } from "@utils/common/responseHandler";
import { Request, Response } from "express";

export const createUploadController = async (req: Request, res: Response) => {
  const userId = req.user._id;
  const formDataName = req.body.name;
  let user = req.user.user;
  if (req.file) {
    responseHandler({
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

export const getUploadListController = async (req: Request, res: Response) => {
  const uploadList = await fileModel.find({ user: req.user._id });
  responseHandler({
    res,
    data: uploadList,
    status: true,
    responseCode: 200,
  });
};
