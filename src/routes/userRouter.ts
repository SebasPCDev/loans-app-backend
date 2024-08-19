import { Router } from "express";
import { postNewUser, getAllUsers } from "../controllers";

const userRouter: Router = Router();

userRouter.get("/users", getAllUsers);
userRouter.post("/newuser", postNewUser);

export default userRouter;
