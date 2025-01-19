import { IBoard } from "@interface/IBoard";
import mongoose, { Schema } from "mongoose";

export const boardSchema = new Schema<IBoard>(
  {
    backgroundImageUrl: { type: "String", required: true },
    emoji: { type: "String", required: true },
    name: { type: "String", required: true },
    date: { type: Date, default: Date.now() },
    user: { type: mongoose.Schema.ObjectId, ref: "user", require: true },
    totalTargets: { type: "Number", default: 0 },
  },
  { timestamps: true }
);
