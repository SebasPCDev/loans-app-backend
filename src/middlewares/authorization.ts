import { UserModel } from "@/config/data-sourcer";
import { Role } from "@/models/role.enum";
import { CustomErrors } from "@/utils/errors/customError";
import { Request, Response, NextFunction } from "express";

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const authorizeUserOrAdmin = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userToFindId = req.params.id;
    const authenticatedUser = req.user;

    if (
      userToFindId !== authenticatedUser?.id &&
      authenticatedUser?.role !== Role.ADMIN
    ) {
      return new CustomErrors("UNAUTHORIZED").returnError(res);
    }

    next();
  } catch (error) {
    return new CustomErrors("INTERNAL_SERVER_ERROR").returnError(res);
  }
};
