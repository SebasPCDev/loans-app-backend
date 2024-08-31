import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers";
import { verifyAccessToken } from "@/middlewares/verifyToken";
import { verifyRole } from "@/middlewares/verifyRole";
import { Role } from "@/models/role.enum";
import { authorizeUserOrAdmin } from "@/middlewares/authorization";
import updateUserById from "@/controllers/Users/updateUserById";
import { validationDtoMiddleware } from "@/middlewares/validationDto";
import { UpdateUserDto } from "@/dtos/user.dto";

const userRouter: Router = Router();

userRouter.get(
  "/users",
  verifyAccessToken,
  verifyRole([Role.ADMIN]),
  getAllUsers
);
userRouter.get(
  "/users/:id",
  verifyAccessToken,
  verifyRole([Role.LENDER, Role.ADMIN]),
  authorizeUserOrAdmin,
  getUserById
);

userRouter.put(
  "/users/:id",
  validationDtoMiddleware(UpdateUserDto),
  verifyAccessToken,
  verifyRole([Role.LENDER, Role.ADMIN]),
  authorizeUserOrAdmin,
  updateUserById
);

export default userRouter;
