import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyJwtToken = async (
  jwtToken: string
): Promise<string | null> => {
  try {
    const deCodedJwt = jwt.verify(
      jwtToken,
      process.env.SECRET_KEY
    ) as JwtPayload;
    const userId = deCodedJwt.id;
    return userId;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("توکن شما منقضی شده است");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("توکن شما صحیح نمی باشد");
    } else {
      throw new Error("مشکل در توکن");
    }
  }
};
