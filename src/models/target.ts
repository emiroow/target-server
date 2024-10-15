import { model, Model } from "mongoose";
import { targetSchema } from "../schemas/data/target.schema";

export const targetModel: Model<any> = model<any>("target", targetSchema);
