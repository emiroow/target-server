import { model, Model, Schema } from "mongoose";
import { IUser } from "../../src/interface/IUser";

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, require: true },
  isActive: { type: Boolean, default: true },
});

export const userModel: Model<IUser> = model<IUser>("users", userSchema);
