import { User } from "../entities/User";
import { UserModel } from "../config/data-sourcer";
import bcrypt from "bcrypt";
import { UserWithoutPassword } from "@/interfaces/userWithoutPassword";
import { CustomErrors } from "@/utils/errors/customError";
import { UpdateUserDto } from "@/dtos/user.dto";

export const getAllUsersService = async (): Promise<UserWithoutPassword[]> => {
  const users = await UserModel.find({
    relations: ["loans"],
  });

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
    throw new CustomErrors("USER_NOT_FOUND");
  }

  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUserByIdService = async (
  body: UpdateUserDto,
  id: string
) => {
  const user = await UserModel.findOneBy({ id });
  if (!user) {
    throw new CustomErrors("USER_NOT_FOUND");
  }

  const updatedUser = UserModel.merge(user, body);

  await UserModel.save(updatedUser);

  const { password, ...userWithoutPassword } = updatedUser;

  return userWithoutPassword;
};
