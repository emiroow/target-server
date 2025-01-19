import { IBoard } from "@interface/IBoard";
import { boardSchema } from "@schemas/data/board.schema";
import { model, Model } from "mongoose";

export const BoardModel: Model<IBoard> = model<IBoard>("board", boardSchema);
