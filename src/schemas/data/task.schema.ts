import mongoose, { Schema } from "mongoose";

export const taskSchema = new Schema<any>(
  {
    checked: { type: Boolean, required: false },
    title: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "user", require: false },
    target: { type: mongoose.Schema.ObjectId, ref: "target", require: false },
    board: { type: mongoose.Schema.ObjectId, ref: "board", require: true },
  },
  { timestamps: true }
);
