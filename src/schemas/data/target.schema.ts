import { DIFFICULTY_STATUS, TARGET_STATUS } from "@interface/enums";
import mongoose, { Schema } from "mongoose";

export const targetSchema = new Schema(
  {
    title: { type: String, require: true },
    subTitle: { type: String, require: true },
    description: { type: String, require: true },
    emoji: { type: String, require: true },
    totalTodo: { type: Number, default: 0 },
    totalDoneTodo: { type: Number, default: 0 },
    totalPendingTodo: { type: Number, default: 0 },
    user: { type: mongoose.Schema.ObjectId, ref: "user" },
    board: { type: mongoose.Schema.ObjectId, ref: "board", require: true },
    status: {
      type: String,
      enum: Object.values(TARGET_STATUS),
      default: TARGET_STATUS.PENDING,
    },
    difficulty: {
      type: String,
      enum: Object.values(DIFFICULTY_STATUS),
      require: true,
    },
  },
  {
    timestamps: true,
    strict: true,
    toJSON: { virtuals: true }, // Include virtuals when converting to JSON
    toObject: { virtuals: true }, // Include virtuals when converting to plain objects
  }
);
