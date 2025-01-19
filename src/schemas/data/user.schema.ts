import { IUser } from "@interface/IUser";
import { Schema } from "mongoose";

export const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  user: { type: String, required: true },
  password: { type: String, require: true },
  isActive: { type: Boolean, default: true },
});
