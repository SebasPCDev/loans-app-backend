import { updateUserByIdService } from "@/services/userService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const updatedUser = await updateUserByIdService(changes, id);
    res.json({ message: "Usuario actualizado", updatedUser });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
