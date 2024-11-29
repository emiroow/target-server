import { model, Model } from "mongoose";
import { taskSchema } from "schemas/data/task.schema";

export const targetModel: Model<any> = model<any>("task", taskSchema);
