import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const changes = req.body;
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
