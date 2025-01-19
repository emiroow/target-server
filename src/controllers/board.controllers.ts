import { BoardModel } from "@models/board";
import { targetModel } from "@models/target";
import { TaskModel } from "@models/task";
import { boardSchema } from "@schemas/validation/board.schema";
import { responseHandler } from "@utils/common/responseHandler";
import { Request, Response } from "express";

export const getBoardListController = async (req: Request, res: Response) => {
  const boardList = await BoardModel.find({ user: req.user._id });
  responseHandler({
    res,
    data: { boardList },
    responseCode: 200,
    status: true,
  });
};

export const createBoardController = async (req: Request, res: Response) => {
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

  responseHandler({
    res,
    data: createBoard,
    massage: "بورد شما با موفقیت ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};

export const getBoardInfoController = async (req: Request, res: Response) => {
  const board = req.query.board;
  if (!board) {
    throw new Error("مشکل در ارسال آیدی بورد مورد نظر");
  }

  const findBoard = await BoardModel.findById(board);

  if (!findBoard) {
    throw new Error("بورد موردنظر یافت نشد");
  }

  responseHandler({
    res,
    data: findBoard,
    responseCode: 200,
    status: true,
  });
};

export const updateBoardController = async (req: Request, res: Response) => {
  const board = req.params.id;
  const bodyData = req.body;

  const { error } = boardSchema.validate(bodyData, { abortEarly: true });

  if (error) {
    responseHandler({
      res,
      data: error,
      massage: error.details[0].message,
      responseCode: 500,
      status: false,
    });
  }

  try {
    const findAndUpdate = await BoardModel.findByIdAndUpdate(board, bodyData, {
      new: true,
      runValidators: true,
    });
    responseHandler({
      res,
      data: findAndUpdate,
      massage: "بورد موردظر شما با موفقیت ویرایش گردید",
      status: true,
      responseCode: 200,
    });
  } catch (error) {
    throw new Error("خطا در ویرایش بورد مورد نظر");
  }
};

export const deleteBoardController = async (req: Request, res: Response) => {
  const board = req.params.id;

  // nested delete
  await TaskModel.deleteMany({ board });
  await targetModel.deleteMany({ board });

  // delete board
  const findAndDelete = await BoardModel.findByIdAndDelete(board, {
    new: true,
    runValidators: true,
  });

  if (!findAndDelete) {
    throw new Error("خطا در حذف بورد مورد نظر");
  }

  responseHandler({
    res,
    data: findAndDelete,
    massage: "بورد موردظر شما با موفقیت حذف گردید",
    status: true,
    responseCode: 200,
  });
};
