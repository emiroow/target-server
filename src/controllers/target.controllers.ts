import { BoardModel } from "@models/board";
import { targetModel } from "@models/target";
import { TaskModel } from "@models/task";
import { targetSchema } from "@schemas/validation/target.schema";
import { responseHandler } from "@utils/common/responseHandler";
import { Request, Response } from "express";

export const createTargetController = async (req: Request, res: Response) => {
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
    board,
  });

  if (checkTargetIsExist) {
    throw new Error("هدف مورد نظر باهمچین اطلاعاتی وجود دارد !");
  }

  const createdData = await targetModel.create({ ...req.body, user, board });

  const totalTargets = await targetModel.findOne({ board }).countDocuments();

  await BoardModel.findByIdAndUpdate(board, { totalTargets });

  responseHandler({
    res,
    data: createdData,
    massage: "هدف مورد نظر ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};

export const updateTargetController = async (req: Request, res: Response) => {
  const target = req.params.id;
  const body = req.body;

  const { error } = targetSchema.validate(body, { abortEarly: true });

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
    const findAndUpdate = await targetModel.findByIdAndUpdate(target, body, {
      new: true,
      runValidators: true,
    });

    responseHandler({
      res,
      data: findAndUpdate,
      massage: "هدف مورد نظر شما با موفقیت ویرایش گردید",
      responseCode: 200,
      status: true,
    });
  } catch (error) {
    throw new Error("خطا در ویرایش هدف مورد نظر !");
  }
};

export const getTargetList = async (req: Request, res: Response) => {
  const board = req.query.board;
  if (!board) {
    throw new Error("خطا در اطلاعات بورد مورد نظر !");
  }
  const list = await targetModel.find({ board }).populate("lastTargetHistory");

  responseHandler({ res, data: list, responseCode: 200, status: true });
};

export const getTargetInfoController = async (req: Request, res: Response) => {
  const target = req.params.id;

  if (!target) {
    throw new Error("مشکل در ارسال آیدی بورد مورد نظر");
  }

  const findTarget = await targetModel.findById(target).populate("board");

  if (!findTarget) {
    throw new Error("تارگت موردنظر یافت نشد");
  }
  responseHandler({
    res,
    data: findTarget,
    responseCode: 200,
    status: true,
  });
};

export const deleteTargetController = async (req: Request, res: Response) => {
  const target = req.params?.id;

  try {
    const { board } = await targetModel.findById(target).populate("board");

    // nested delete
    await TaskModel.deleteMany({ target });

    const findAndDelete = await targetModel.findByIdAndDelete(target, {
      new: true,
      runValidators: true,
    });

    const totalTargets = await targetModel
      .find({ board: board._id })
      .countDocuments();

    await BoardModel.findByIdAndUpdate(board._id, { totalTargets });

    responseHandler({
      res,
      data: { findAndDelete },
      massage: "هدف موردظر شما با موفقیت حذف گردید",
      status: true,
      responseCode: 200,
    });
  } catch (error) {
    throw new Error("خطا در حذف هدف مورد نظر");
  }
};
