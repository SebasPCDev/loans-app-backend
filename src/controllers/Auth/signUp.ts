import { signupService } from "@/services/authService";
import { Request, Response } from "express";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

export default async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const newUser = await signupService(data);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
