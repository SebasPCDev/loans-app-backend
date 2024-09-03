import { LoanModel, UserModel } from "@/config/data-sourcer";
import { User } from "@/entities/User";
import { Role } from "@/models/role.enum";
import bcrypt from "bcrypt";

export const postLoan = async (data: any, id: string) => {
  const debtorFind = await UserModel.findOneBy({
    identification: data.debtor_identification,
  }); // id del usuario que se va a prestar el dinero
  const lenderFind = await UserModel.findOneBy({ id: id }); // id del usuario logueado

  if (!debtorFind) {
    const randomPassword = "Test1234!"; //Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(randomPassword, 10);
    const debtor = UserModel.create({
      identification: data.debtor_identification,
      name: data.debtor_name,
      last_name: data.debtor_last_name,
      email: data.debtor_email,
      password: hashedPassword,
      age: data.debtor_age,
      role: "debtor",
    });
    await UserModel.save(debtor);

    const loan = LoanModel.create({
      debtor: debtor as User,
      lender: lenderFind as User,
      amount: data.amount,
      interest_rate: data.interest_rate,
      start_date: data.start_date,
      end_date: data.end_date,
      payment_frequency: data.frequency_payment,
      remaining_balance: 0,
      status: data.status,
    });

    await LoanModel.save(loan);

    return { message: "Préstamo creado con éxtito", loan: loan }; // Devuelve el objeto loan
  }

  return { message: "El deudor ya existe" };
};

//Funciones auxiliares
