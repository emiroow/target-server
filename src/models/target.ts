import { model, Model } from "mongoose";
import { targetSchema } from "../schemas/data/target.schema";

targetSchema.virtual("lastTargetHistory", {
  ref: "task",
  localField: "_id",
  foreignField: "target",
  options: { sort: { updatedAt: -1 }, limit: 3 },
});

export const targetModel: Model<any> = model<any>("target", targetSchema);
