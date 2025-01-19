import { taskSchema } from "@schemas/data/task.schema";
import { model, Model } from "mongoose";

export const TaskModel: Model<any> = model<any>("task", taskSchema);
