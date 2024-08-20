import express from "express";
import { defaultRoute } from "@/routes/defaultRoute";
import moment from "moment";
import userRouter from "@/routes/userRouter";

export const routes = express.Router();

// Global Middleware Logger
routes.use((req, res, next) => {
  const date = moment().format("dddd, D MMMM YYYY, h:mm:ss a");
  console.log(
    `[Global Middleware Logger] \nHTTP Request: ${req.method}\nPath: ${req.url}\nDate: ${date} \n--------------------`
  );
  next();
});

// Routes
routes.use(defaultRoute);
routes.use(userRouter);
