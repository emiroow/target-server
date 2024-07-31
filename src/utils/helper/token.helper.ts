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
      throw new Error("JWT token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid JWT token");
    } else {
      throw new Error("An error occurred during JWT verification");
    }
  }
};
