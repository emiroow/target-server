import { Response } from "express";
import { TaskModel } from "../models/task";
import { request } from "../types/request";
import { responseHandler } from "../utils";

export const getTasksController = async (req: request, res: Response) => {
  const user = req.user._id;
  const target = req.query.target;

  if (!target) {
    throw new Error("خطا در اطلاعات تارگت مورد نظر !");
  }

  const findUserTasks = await TaskModel.find({ target, user }).populate(
    "target"
  );

  return responseHandler({
    res,
    data: findUserTasks,
    responseCode: 200,
    status: true,
  });
};

export const createTasksController = async (req: request, res: Response) => {
  const user = req.user._id;
  const target = req.params.id;
  const body = req.body;

  const { title, description } = req.body;

  if (!target) {
    throw new Error("Board Id is required filed in query Params !");
  }

  const checkTaskIsExist = await TaskModel.findOne({
    title,
    description,
    target,
  });

  if (checkTaskIsExist) {
    throw new Error("هدف مورد نظر باهمچین اطلاعاتی وجود دارد !");
  }

  const createdTask = await TaskModel.create({
    ...body,
    checked: false,
    user,
    target,
  });

  return responseHandler({
    res,
    data: createdTask,
    massage: "هدف مورد نظر ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};
export const updateTasksController = async (req: request, res: Response) => {};
export const deleteTasksController = async (req: request, res: Response) => {};
