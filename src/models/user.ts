import { IUser } from "@interface/IUser";
import { userSchema } from "@schemas/data/user.schema";
import { model, Model } from "mongoose";

export const userModel: Model<IUser> = model<IUser>("user", userSchema);
