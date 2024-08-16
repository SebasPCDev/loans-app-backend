import express from "express";
import { defaultRoute } from "./defaultRoute";
import { calcRoute } from "./calcRoute";

export const routes = express.Router();

routes.use(defaultRoute);
routes.use(calcRoute);
