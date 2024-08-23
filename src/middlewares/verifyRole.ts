import { Response, NextFunction } from "express";

export const verifyRole = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;
    if (userRole !== role) {
      return res.status(403).json({
        message: "Access denied. You do not have the required role.",
      });
    }
    next();
  };
};
