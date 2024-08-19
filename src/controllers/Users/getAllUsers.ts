import { Request, Response } from "express";
import { getAllUsersService } from "../../services/userService";

export default async (req: Request, res: Response) => {
  const users = await getAllUsersService();
  res.status(200).json(users);
};
