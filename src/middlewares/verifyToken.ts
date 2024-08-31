import { Response, Request, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { CustomErrors } from "@/utils/errors/customError";
dotenv.config();

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyAccessToken = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (!token) {
    return new CustomErrors("UNAUTHORIZED").returnError(res);
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return new CustomErrors("INTERNAL_SERVER_ERROR").returnError(res);
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired." });
    } else if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: "Invalid token." });
    } else {
      return res.status(500).json({ message: "Internal server error." });
    }
  }
};
