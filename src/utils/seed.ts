import { UserModel } from "@/config/data-sourcer";
import bcrypt from "bcrypt";

export const seedDatabase = async () => {
  const emailExists = await UserModel.findOneBy({ email: "admin@admin.com" });
  if (emailExists) {
    console.log("Datos precargados anteriormente");
    return;
  }
  try {
    const hash = await bcrypt.hash("Admin123!", 10);
    const adminSeed = await UserModel.create({
      name: "Admin",
      last_name: "God",
      email: "admin@admin.com",
      password: hash,
      age: 30,
      role: "admin",
    });
    await UserModel.save(adminSeed);
    console.log("Datos precargados correctamente");
  } catch (error) {
    console.error("Error en la precarga de datos:", error);
    throw error;
  }
};
