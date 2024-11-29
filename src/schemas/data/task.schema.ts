import { Schema } from "mongoose";

export const taskSchema = new Schema<any>(
  {
    checked: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, require: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);
