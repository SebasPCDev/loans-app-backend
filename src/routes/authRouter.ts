import { Router } from "express";

import login from "@/controllers/Auth/login";
import signUp from "@/controllers/Auth/signUp";
import { validationDtoMiddleware } from "@/middlewares/validationDto";
import { CreateUserDto } from "@/dtos/user.dto";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", validationDtoMiddleware(CreateUserDto), signUp);

export default authRouter;
