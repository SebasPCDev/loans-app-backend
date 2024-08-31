import { CustomErrors } from "@/utils/errors/customError";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface CustomRequest extends Request {
  user?: string | JwtPayload;
}

export const checkSession = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;
  if (token) {
    return new CustomErrors("USER_ALREADY_LOGGED_IN").returnError(res);
  }
  next();
};
