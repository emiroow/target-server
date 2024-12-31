import { Response } from "express";
import { targetModel } from "../models/target";
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

  const totalDoneTodo = await TaskModel.find({
    target,
    checked: true,
  }).countDocuments();

  const totalTodo = await TaskModel.find({
    target,
  }).countDocuments();

  const totalPendingTodo = await TaskModel.find({
    target,
    checked: false,
  }).countDocuments();

  await targetModel.findByIdAndUpdate(target, {
    totalDoneTodo,
    totalTodo,
    totalPendingTodo,
    status: totalPendingTodo === 0 ? "finished" : "pending",
  });

  return responseHandler({
    res,
    data: createdTask,
    massage: "هدف مورد نظر ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};

export const updateTasksController = async (req: request, res: Response) => {
  const taskId = req.params.id;
  const body = req.body;

  if (!body || !taskId) {
    throw new Error("خطا در ارسال اطلاعات !");
  }

  try {
    const checkTaskIsExist = await TaskModel.findOne({
      title: body.title,
    });

    if (checkTaskIsExist) {
      return responseHandler({
        res,
        data: checkTaskIsExist,
        massage: "هدف مورد نظر باهمچین اطلاعاتی وجود دارد !",
        responseCode: 500,
        status: true,
      });
    }

    const findAndUpdateTask = await TaskModel.findByIdAndUpdate(
      taskId,
      body
    ).populate("target");

    const totalDoneTodo = await TaskModel.find({
      target: findAndUpdateTask.target._id,
      checked: true,
    }).countDocuments();

    const totalTodo = await TaskModel.find({
      target: findAndUpdateTask.target._id,
    }).countDocuments();

    const totalPendingTodo = await TaskModel.find({
      target: findAndUpdateTask.target._id,
      checked: false,
    }).countDocuments();

    await targetModel.findByIdAndUpdate(findAndUpdateTask.target._id, {
      totalDoneTodo,
      totalTodo,
      totalPendingTodo,
      status: totalPendingTodo === 0 ? "finished" : "pending",
    });

    return responseHandler({
      res,
      data: findAndUpdateTask,
      massage: "وضعیت هدف شما تغییر کرد",
      responseCode: 200,
      status: true,
    });
  } catch (error) {
    return responseHandler({
      res,
      data: error,
      massage: "خطا در سرویس !",
      responseCode: 500,
      status: true,
    });
  }
};

export const deleteTasksController = async (req: request, res: Response) => {
  const task = req.params?.id;

  try {
    // const findAndDelete = await TaskModel.findByIdAndDelete(task, {
    //   new: true,
    //   runValidators: true,
    // });

    return responseHandler({
      res,
      data: {},
      massage: "هدف موردظر شما با موفقیت حذف گردید",
      status: true,
      responseCode: 200,
    });
  } catch (error) {
    throw new Error("خطا در حذف هدف مورد نظر");
  }
};
