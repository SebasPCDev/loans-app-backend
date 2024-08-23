import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers";
import { verifyAccessToken } from "@/middlewares/verifyToken";

const userRouter: Router = Router();

userRouter.get("/users", verifyAccessToken, getAllUsers);
userRouter.get("/users/:id", verifyAccessToken, getUserById);

export default userRouter;
