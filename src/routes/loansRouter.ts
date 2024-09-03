import { postLoan } from "@/controllers";
import { CreateLoanDTO } from "@/dtos/loan.dto";
import { validationDtoMiddleware } from "@/middlewares/validationDto";
import { verifyRole } from "@/middlewares/verifyRole";
import { verifyAccessToken } from "@/middlewares/verifyToken";
import { Role } from "@/models/role.enum";
import { Router } from "express";

const loansRouter: Router = Router();

loansRouter.post(
  "/loans",
  verifyAccessToken,
  verifyRole([Role.LENDER]),
  validationDtoMiddleware(CreateLoanDTO),
  postLoan
);

export default loansRouter;
