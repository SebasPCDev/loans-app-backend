import { Router } from "express";

export const defaultRoute = Router();

defaultRoute.get("/", (req, res) => {
  res.send("Esta es el inicio de la App de Préstamos");
});
