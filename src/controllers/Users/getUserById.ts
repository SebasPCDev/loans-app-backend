import { getUserByIdService } from "@/services/userService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await getUserByIdService(id);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
