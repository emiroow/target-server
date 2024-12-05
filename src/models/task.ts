import { model, Model } from "mongoose";
import { taskSchema } from "../schemas/data/task.schema";

export const TaskModel: Model<any> = model<any>("task", taskSchema);
