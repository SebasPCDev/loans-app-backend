import express, { Application } from "express";
import cookieParser from "cookie-parser";
import { routes } from "@/routes";
import { AppDataSource } from "@/config/data-sourcer";
import dotenv from "dotenv";
import "reflect-metadata";
import { seedDatabase } from "./utils/seed";

dotenv.config();
const app: Application = express();
// Middleware para el análisis del cuerpo
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Rutas
app.use("/", routes);

// Inicialización de la base de datos y el servidor
AppDataSource.initialize()
  .then(async () => {
    console.log("Conexión exitosa");

    await seedDatabase();

    app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos", error);
    process.exit(1);
  });
