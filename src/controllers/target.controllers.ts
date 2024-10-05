import { Response } from "express";
import { request } from "types/request";
import { targetModel } from "../models/target";
import { responseHandler } from "../utils";

export const createTargetController = async (req: request, res: Response) => {
  const { title, subTitle, description } = req.body;
  const user = req.user._id;
  const board = req.query.board;
  if (!board) {
    throw new Error("Board Id is required filed in query Params !");
  }
  const checkTargetIsExist = await targetModel.findOne({
    title,
    subTitle,
    description,
  });
  if (checkTargetIsExist) {
    throw new Error("هدف مورد نظر باهمچین اطلاعاتی وجود دارد !");
  }

  const createdData = await targetModel.create({ ...req.body, user, board });

  return responseHandler({
    res,
    data: createdData,
    massage: "هدف مورد نظر ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};

export const getTargetList = async (req: request, res: Response) => {
  const board = req.query.board;
  if (!board) {
    throw new Error("خطا در اطلاعات بورد مورد نظر !");
  }
  const list = await targetModel.find({ board: board }).populate("board");
  return responseHandler({ res, data: list, responseCode: 200, status: true });
};
