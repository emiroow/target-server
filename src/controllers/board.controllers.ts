import { Response } from "express";
import { request } from "types/request";
import { BoardModel } from "../models/board";
import { responseHandler } from "../utils/index";

export const getBoardListController = async (req: request, res: Response) => {
  const boardList = await BoardModel.find();
  console.log(boardList);
  return responseHandler({
    res,
    data: boardList,
    responseCode: 200,
    status: true,
  });
};

export const createBoardController = async (req: request, res: Response) => {
  const { date, emoji, name } = req.body;

  const checkIsExistBoard = await BoardModel.findOne({
    $or: [{ name }],
  });
  if (checkIsExistBoard) {
    throw new Error("بوردی با همچین مشخصاتی وجورد دارد");
  }

  const createBoard = (await BoardModel.create(req.body)).toObject();

  return responseHandler({
    res,
    data: createBoard,
    massage: "بورد شما با موفقیت ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};
