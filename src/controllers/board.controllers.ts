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

export const getBoardInfoController = async (req: request, res: Response) => {
  const board = req.query.board;
  if (!board) {
    throw new Error("مشکل در ارسال آیدی بورد مورد نظر");
  }

  const findBoard = await BoardModel.findById(board);

  if (!findBoard) {
    throw new Error("بورد موردنظر یافت نشد");
  }

  return responseHandler({
    res,
    data: findBoard,
    responseCode: 200,
    status: true,
  });
};

export const updateBoardController = async (req: request, res: Response) => {
  const board = req.params.id;
  const bodyData = req.body;

  const findAndUpdate = await BoardModel.findByIdAndUpdate(board, bodyData, {
    new: true,
    runValidators: true,
  });

  if (!findAndUpdate) {
    throw new Error("خطا در ویرایش بورد مورد نظر");
  }

  return responseHandler({
    res,
    data: findAndUpdate,
    massage: "بورد موردظر شما با موفقیت ویرایش گردید",
    status: true,
    responseCode: 200,
  });
};

export const deleteBoardController = async (req: request, res: Response) => {
  const board = req.params.id;

  const findAndDelete = await BoardModel.findByIdAndDelete(board, {
    new: true,
    runValidators: true,
  });

  if (!findAndDelete) {
    throw new Error("خطا در حذف بورد مورد نظر");
  }

  return responseHandler({
    res,
    data: findAndDelete,
    massage: "بورد موردظر شما با موفقیت حذف گردید",
    status: true,
    responseCode: 200,
  });
};
