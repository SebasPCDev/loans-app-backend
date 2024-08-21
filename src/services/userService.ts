import { User } from "../entities/User";
import { UserModel } from "../config/data-sourcer";
import bcrypt from "bcrypt";

export const createUserService = async (info: any): Promise<User> => {
  if (
    !info.name ||
    !info.last_name ||
    !info.email ||
    !info.age ||
    !info.role ||
    !info.password
  ) {
    throw new Error("All fields are required");
  }

  const hashedPassword = await bcrypt.hash(info.password, 10);
  const newUser = await UserModel.create({
    name: info.name,
    last_name: info.last_name,
    email: info.email,
    age: info.age,
    role: info.role,
    password: hashedPassword,
  });
  await UserModel.save(newUser);
  return newUser;
};

export const getAllUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find();

  return users;
};
