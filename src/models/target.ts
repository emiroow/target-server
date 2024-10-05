import { model, Model } from "mongoose";
import { targetSchema } from "../schemas/data/target.schema";

targetSchema.pre("save", async () => {
  console.log("first");
});

targetSchema.pre("find", async () => {
  console.log("find");
});

export const targetModel: Model<any> = model<any>("target", targetSchema);
