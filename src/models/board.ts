import { model, Model } from "mongoose";
import { boardSchema } from "schemas/data/board.schema";

export const boardModel: Model<any> = model<any>("board", boardSchema);
