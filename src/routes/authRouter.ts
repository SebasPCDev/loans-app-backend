import { Router } from "express";

import login from "@/controllers/Auth/login";

const authRouter: Router = Router();

authRouter.post("/login", login);

export default authRouter;
