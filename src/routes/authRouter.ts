import { Router } from "express";

import login from "@/controllers/Auth/login";
import signUp from "@/controllers/Auth/signUp";
import { validationDtoMiddleware } from "@/middlewares/validationDto";
import { CreateUserDto } from "@/dtos/user.dto";
import { LoginDto } from "@/dtos/auth.dto";

import { checkSession } from "@/middlewares/verifySession";

const authRouter: Router = Router();

authRouter.post(
  "/login",
  checkSession,
  validationDtoMiddleware(LoginDto),
  login
);
authRouter.post(
  "/signup",
  checkSession,
  validationDtoMiddleware(CreateUserDto),
  signUp
);

export default authRouter;
