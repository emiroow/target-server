import { model, Model, Schema } from "mongoose";
import { IUser } from "src/interface/IUser";

const userSchema = new Schema<IUser>({
  fullName: { type: String },
  mobileNumber: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

export const userModel: Model<IUser> = model<IUser>("users", userSchema);
