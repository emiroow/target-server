import { targetModel } from "@models/target";
import { TaskModel } from "@models/task";
import { responseHandler } from "@utils/common/responseHandler";
import { Request, Response } from "express";

export const getTasksController = async (req: Request, res: Response) => {
  const user = req.user._id;
  const target = req.query.target;

  if (!target) {
    throw new Error("خطا در اطلاعات تارگت مورد نظر !");
  }

  const findUserTasks = await TaskModel.find({ target, user }).populate(
    "target"
  );

  responseHandler({
    res,
    data: findUserTasks,
    responseCode: 200,
    status: true,
  });
};

export const createTasksController = async (req: Request, res: Response) => {
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

  // find board Id
  const { board } = await targetModel.findById(target);

  const createdTask = await TaskModel.create({
    ...body,
    checked: false,
    user,
    target,
    board,
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

  responseHandler({
    res,
    data: createdTask,
    massage: "هدف مورد نظر ایجاد گردید",
    responseCode: 201,
    status: true,
  });
};

export const updateTasksController = async (req: Request, res: Response) => {
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
      responseHandler({
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
    responseHandler({
      res,
      data: findAndUpdateTask,
      massage: "وضعیت هدف شما تغییر کرد",
      responseCode: 200,
      status: true,
    });
  } catch (error) {
    responseHandler({
      res,
      data: error,
      massage: "خطا در سرویس !",
      responseCode: 500,
      status: true,
    });
  }
};

export const deleteTasksController = async (req: Request, res: Response) => {
  const taskId = req.params?.id;

  try {
    const findAndDeleteTask = await TaskModel.findByIdAndDelete(taskId, {
      new: true,
      runValidators: true,
    }).populate("target");

    const totalDoneTodo = await TaskModel.find({
      target: findAndDeleteTask.target._id,
      checked: true,
    }).countDocuments();

    const totalTodo = await TaskModel.find({
      target: findAndDeleteTask.target._id,
    }).countDocuments();

    const totalPendingTodo = await TaskModel.find({
      target: findAndDeleteTask.target._id,
      checked: false,
    }).countDocuments();

    await targetModel.findByIdAndUpdate(findAndDeleteTask.target._id, {
      totalDoneTodo,
      totalTodo,
      totalPendingTodo,
      status: totalPendingTodo === 0 ? "finished" : "pending",
    });
    responseHandler({
      res,
      data: findAndDeleteTask,
      massage: "هدف موردظر شما با موفقیت حذف گردید",
      status: true,
      responseCode: 200,
    });
  } catch (error) {
    throw new Error("خطا در حذف هدف مورد نظر");
  }
};
