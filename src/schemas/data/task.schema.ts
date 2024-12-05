import mongoose, { Schema } from "mongoose";

export const taskSchema = new Schema<any>(
  {
    checked: { type: Boolean, required: false },
    title: { type: String, required: true },
    description: { type: String, require: false },
    user: { type: mongoose.Schema.ObjectId, ref: "user", require: false },
    target: { type: mongoose.Schema.ObjectId, ref: "target", require: false },
  },
  { timestamps: true }
);
