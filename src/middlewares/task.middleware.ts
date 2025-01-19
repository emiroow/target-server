import { TaskModel } from "@models/task";
import { responseHandler } from "@utils/common/responseHandler";
import { Request, Response } from "express";

export const taskMiddleware = async (
  req: Request,
  res: Response,
  next: any
) => {
  const { method, params, body } = req;

  try {
    const findTask = await TaskModel.findById(params.id).populate({
      path: "target",
      populate: [{ path: "board" }, { path: "user" }],
    });

    const target = findTask;
    const totalTodo: number = target.totalTodo;
    const totalDoneTodo: number = target.totalDoneTodo;
    const totalPendingTodo: number = target.totalPendingTodo;

    let updatedData = {
      totalDoneTodo: 0,
      totalPendingTodo: 0,
    };

    switch (method) {
      case "PUT":
        const { checked } = body;
        const tasksListWithFilter = await TaskModel.find({
          checked: false,
        });

        console.log(tasksListWithFilter);

        updatedData = {
          totalDoneTodo: checked ? totalDoneTodo + 1 : totalDoneTodo - 1,
          totalPendingTodo: 0,
        };

      default:
        break;
    }

    // const findAndUpdateTarget = await targetModel.findByIdAndUpdate(
    //   target._id,
    //   updatedData
    // );

    // console.log(findAndUpdateTarget);
  } catch (error) {
    responseHandler({
      res,
      data: error,
      massage: "خطا در سرویس !",
      responseCode: 500,
      status: true,
    });
  }
  next();
};
