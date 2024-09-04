import { LoanModel, UserModel } from "@/config/data-sourcer";
import { User } from "@/entities/User";
import bcrypt from "bcrypt";

export const postLoan = async (data: any, id: string) => {
  //1. Verificar si el deudor ya existe
  const debtorFind = await UserModel.findOne({
    where: {
      identification: data.debtor_identification,
      email: data.debtor_email,
    },
  });
  console.log(debtorFind);

  //2. Obtenemos la información del prestamista
  const lenderFind = await UserModel.findOneBy({ id: id }); // id del usuario logueado

  //3. Si el deudor no existe, se crea
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

    //4. Se crea el préstamo
    const loanExistedDebtor = LoanModel.create({
      debtor: debtor.toSafeObject(),
      lender: lenderFind!.toSafeObject(),
      amount: data.amount,
      interest_rate: data.interest_rate,
      start_date: data.start_date,
      end_date: data.end_date,
      payment_frequency: data.frequency_payment,
      remaining_balance: 0,
      status: data.status,
    });

    //5. Se guarda el préstamo
    await LoanModel.save(loanExistedDebtor);

    return {
      message: `Se ha creado un nuevo usuario ${debtor.name} ${debtor.last_name} y un nuevo préstamo`,
      loan: loanExistedDebtor,
    };
  } else {
    //6. Si el deudor ya existe, se muestra un mensaje
    if (data.debtor_email !== debtorFind.email) {
      return {
        message:
          "El correo no coincide con la identificación del deudor registrado",
      };
    }

    const loanNoDebtor = LoanModel.create({
      debtor: debtorFind.toSafeObject(),
      lender: lenderFind!.toSafeObject(),
      amount: data.amount,
      interest_rate: data.interest_rate,
      start_date: data.start_date,
      end_date: data.end_date,
      payment_frequency: data.frequency_payment,
      remaining_balance: 0,
      status: data.status,
    });

    await LoanModel.save(loanNoDebtor);

    return {
      message: `Se ha añadido un nuevo préstamo a ${debtorFind?.name} ${debtorFind?.last_name}`,
      loan: loanNoDebtor,
    };
  }
};

const deletePassword = (data: User) => {
  const { password, ...deptorWithOutPassword } = data;
  return deptorWithOutPassword;
};
