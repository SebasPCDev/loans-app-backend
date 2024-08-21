import { Payment } from "../entities/Payment";
import { User } from "../entities/User";
import { DataSource } from "typeorm";
import { Loan } from "../entities/Loan";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: ["error"],
  entities: [User, Payment, Loan],
  subscribers: [],
  migrations: [],
  dropSchema: true,
});

export const UserModel = AppDataSource.getRepository(User);
export const PaymentModel = AppDataSource.getRepository(Payment);
export const LoanModel = AppDataSource.getRepository(Loan);
