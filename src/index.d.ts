import { IUser } from "src/interface/IUser";

declare global {
  namespace Express {
    interface Request {
      loggedInUser: IUser;
    }
  }
}
