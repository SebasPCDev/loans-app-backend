import { UserModel } from "@/config/data-sourcer";
import bcrypt from "bcrypt";

export const seedDatabase = async () => {
  const users = [
    {
      identification: "0000000000",
      name: "Admin",
      last_name: "God",
      email: "admin@admin.com",
      password: "Admin123!",
      age: 30,
      role: "admin",
    },
    {
      identification: "1234567890",
      name: "John",
      last_name: "Doe",
      email: "lender@mail.com",
      password: "John123!",
      age: 25,
      role: "lender",
    },
  ];

  try {
    for (const user of users) {
      const emailExists = await UserModel.findOneBy({ email: user.email });
      if (emailExists) {
        console.log(`Usuario con email ${user.email} ya existe.`);
        continue;
      }

      const hash = await bcrypt.hash(user.password, 10);
      const userSeed = UserModel.create({
        ...user,
        password: hash,
      });

      await UserModel.save(userSeed);
      console.log(`Usuario ${user.email} precargado correctamente`);
    }
  } catch (error) {
    console.error("Error en la precarga de datos:", error);
    throw error;
  }
};
