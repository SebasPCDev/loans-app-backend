import { Router } from "express";

import login from "@/controllers/Auth/login";
import signUp from "@/controllers/Auth/signUp";

const authRouter: Router = Router();

authRouter.post("/login", login);
authRouter.post("/signup", signUp);

export default authRouter;
