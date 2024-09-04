import { model, Model } from "mongoose";
import { IUser } from "../../src/interface/IUser";
import { userSchema } from "../schemas/data/user.schema";

export const userModel: Model<IUser> = model<IUser>("user", userSchema);
