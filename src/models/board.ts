import { model, Model } from "mongoose";
import { IBoard } from "../interface/IBoard";
import { boardSchema } from "../schemas/data/board.schema";

export const BoardModel: Model<IBoard> = model<any>("board", boardSchema);
