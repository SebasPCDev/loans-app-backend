import { loginService } from "@/services/authService";
import { Request, Response } from "express";

export default async (req: Request, res: Response) => {
  const data = req.body;
  try {
    const request = await loginService(data);
    res
      .cookie("access_token", request.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .status(200)
      .json({ message: "Inicio de sesión exitoso", user: request.user });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
