import { IBoard } from "interface/IBoard";
import { Schema } from "mongoose";

export const boardSchema = new Schema<IBoard>(
  {
    backgroundImageUrl: { type: "String", required: true },
    emoji: { type: "String", required: true },
    name: { type: "String", required: true },
    date: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
