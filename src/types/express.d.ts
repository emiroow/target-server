import { IUser } from "@interface/IUser";

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // Add user to the Request interface
    }
  }
}
