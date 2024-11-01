import mongoose, { Schema } from "mongoose";
import { DIFFICULTY_STATUS, TARGET_STATUS } from "../../interface/enums";

export const targetSchema = new Schema(
  {
    title: { type: String, require: true },
    subTitle: { type: String, require: true },
    description: { type: String, require: true },
    // lastTargetHistory: { type: array },
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
  }
);
