import { model, Model, Schema } from "mongoose";

export interface IUser {
  _id: string;
  fullName: string;
  mobileNumber: number;
  isActive: boolean;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String },
  mobileNumber: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
});

export const userModel: Model<IUser> = model<IUser>("users", userSchema);
