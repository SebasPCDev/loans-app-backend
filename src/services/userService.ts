import { User } from "../entities/User";
import { UserModel } from "../config/data-sourcer";
import bcrypt from "bcrypt";

interface UserWithoutPassword {
  name: string;
  last_name: string;
  email: string;
  age: number;
  id: string;
  role: string;
  created_at: Date;
  updated_at: Date;
}

export const getAllUsersService = async (): Promise<UserWithoutPassword[]> => {
  const users = await UserModel.find();

  const usersWithoutPassword = users.map((user) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });

  return usersWithoutPassword;
};

export const getUserByIdService = async (
  id: string
): Promise<UserWithoutPassword> => {
  const user = await UserModel.findOneBy({ id });
  if (!user) {
    throw new Error("User not found");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
