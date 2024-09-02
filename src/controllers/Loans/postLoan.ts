import { postLoan } from "@/services/loanService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const loan = await postLoan(data);
    res.status(201).json(loan);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
