import { postLoan } from "@/controllers";
import { CreateLoanDTO } from "@/dtos/loan.dto";
import { validationDtoMiddleware } from "@/middlewares/validationDto";
import { Router } from "express";

const loansRouter: Router = Router();

loansRouter.post("/loans", validationDtoMiddleware(CreateLoanDTO), postLoan);

export default loansRouter;
