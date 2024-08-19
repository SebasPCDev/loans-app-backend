import express, { Application } from "express";
import { routes } from "./routes";
import { AppDataSource } from "./config/data-sourcer";
import dotenv from "dotenv";
import "reflect-metadata";
import session from "express-session";

dotenv.config();
const app: Application = express();
// Middleware para el análisis del cuerpo
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  session({
    secret: "sebaspcdev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
  })
);

// Rutas
app.use("/", routes);

// Inicialización de la base de datos y el servidor
AppDataSource.initialize()
  .then(() => {
    console.log("Conexión exitosa");
    app.listen(process.env.PORT, () => {
      console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos", error);
    process.exit(1);
  });
