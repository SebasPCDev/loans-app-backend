import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers";
import { verifyAccessToken } from "@/middlewares/verifyToken";
import { verifyRole } from "@/middlewares/verifyRole";
import { Role } from "@/models/role.enum";
import { authorizeUserOrAdmin } from "@/middlewares/authorization";

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

export default userRouter;
