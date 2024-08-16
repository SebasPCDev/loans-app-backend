import express from "express";
import { Application } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { routes } from "./routes";

const app: Application = express();

// body-parser
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
dotenv.config();

// routes
app.use("/", routes);

// start the server
app.listen(process.env.PORT, () => {
  console.log("*".repeat(80));
  console.log(`Servidor corriendo en : http://localhost:${process.env.PORT}`);
  console.log("*".repeat(80));
});
