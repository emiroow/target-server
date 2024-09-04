import mongoose, { Schema } from "mongoose";

export const fileSchema = new Schema<any>(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: "user", require: true },
    url: { type: String },
  },
  { timestamps: true }
);
