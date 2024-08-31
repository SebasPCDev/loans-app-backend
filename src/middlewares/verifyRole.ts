import { Role } from "@/models/role.enum";
import { CustomErrors } from "@/utils/errors/customError";
import { Response, NextFunction, Request } from "express";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export const verifyRole = (roles: Role[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const roleVerified = roles.includes(req.user?.role);
    if (roleVerified) {
      next();
    } else {
      return new CustomErrors("UNAUTHORIZED").returnError(res);
    }
  };
};
