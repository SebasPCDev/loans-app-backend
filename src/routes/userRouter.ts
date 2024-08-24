import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers";
import { verifyAccessToken } from "@/middlewares/verifyToken";
import { verifyRole } from "@/middlewares/verifyRole";
import { Role } from "@/models/role.enum";

const userRouter: Router = Router();

userRouter.get(
  "/users",
  verifyAccessToken,
  //   verifyRole([Role.SUPERADMIN, Role.ADMIN, Role.LENDER, Role.DEBTOR]),
  getAllUsers
);
userRouter.get("/users/:id", verifyAccessToken, getUserById);

export default userRouter;
