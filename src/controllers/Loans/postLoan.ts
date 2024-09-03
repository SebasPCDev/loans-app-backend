import { postLoan } from "@/services/loanService";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

interface CustomRequest extends Request {
  user?: JwtPayload;
}

export default async (req: CustomRequest, res: Response) => {
  const data = req.body;
  try {
    const loan = await postLoan(data, req.user?.id);
    res.status(201).json(loan);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
