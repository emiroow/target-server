import { Response } from "express";
import { request } from "types/request";
import { BoardModel } from "../models/board";
import { responseHandler } from "../utils/index";

export const getBoardListController = async (req: request, res: Response) => {
  const boardList = await BoardModel.find({ user: req.user._id });

  return responseHandler({
    res,
    data: { boardList },
    responseCode: 200,
    status: true,
  });
};

export const createBoardController = async (req: request, res: Response) => {
  const { name } = req.body;

  const checkIsExistBoard = await BoardModel.findOne({
    $or: [{ name }],
  });
  if (checkIsExistBoard) {
    throw new Error("بورد مورد نظر با همچین مشخصاتی وجورد دارد");
  }

  const createBoard = (
    await BoardModel.create({ ...req.body, user: req.user._id })
  ).toObject();

  return responseHandler({
    res,
    data: createBoard,
    massage: "بورد شما با موفقیت ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};

export const getInfoBoardController = async (req: request, res: Response) => {};
