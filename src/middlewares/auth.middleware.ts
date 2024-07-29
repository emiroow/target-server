import { NextFunction, Request } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "src/interface/IUser";
import { userModel } from "src/models/user";
export const checkUserAuthentication = (req: Request, next: NextFunction) => {
  try {
    const Authorization = req.headers.authorization;
    if (!Authorization || !Authorization.includes("Bearer"))
      throw new Error("authentication error !");

    const jwtToken = Authorization.split("Bearer ")[1];

    const deCodedJwt = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY
    ) as JwtPayload;

    const userId = !deCodedJwt._id;

    if (!userId) throw new Error("authentication error !");

    const user = userModel.findById(userId).lean() as IUser;

    if (!user) throw new Error("authentication error !");

    req.loggedInUser = user;

    next();
  } catch (error) {
    throw new Error("authentication error !");
  }
};
