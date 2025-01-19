import { fileSchema } from "@schemas/data/file.schema";
import { Model, model } from "mongoose";

export const fileModel: Model<any> = model<any>("file", fileSchema);
