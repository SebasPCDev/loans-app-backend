import { Role } from "@/models/role.enum";
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
      res
        .status(403)
        .json({ message: "No tienes permisos para realizar esta acción" });
    }
  };
};
