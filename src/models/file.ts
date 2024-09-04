import { Model, model } from "mongoose";
import { fileSchema } from "../schemas/data/file.schema";

export const fileModel: Model<any> = model<any>("file", fileSchema);
