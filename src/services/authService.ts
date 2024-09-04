import { UserModel } from "@/config/data-sourcer";
import { User } from "@/entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserWithoutPassword } from "@/interfaces/userWithoutPassword";
import { CreateUserDto } from "@/dtos/user.dto";
import { CustomErrors } from "@/utils/errors/customError";

dotenv.config();

interface LoginInfo {
  email: string;
  password: string;
}

//Funciones principales
export const loginService = async (
  info: LoginInfo
): Promise<{ user: User; token: string }> => {
  try {
    validateLoginInfo(info);

    const user = await findUserByEmail(info.email);
    await verifyPassword(info.password, user.password);

    const token = generateToken(user);

    return { user: user.toSafeObject() as User, token };
  } catch (error: any) {
    throw new CustomErrors("AUTHENTICATION_FAILED");
  }
};

export const signupService = async (
  info: CreateUserDto
): Promise<UserWithoutPassword> => {
  try {
    const emailExists = await UserModel.findOneBy({ email: info.email });
    if (emailExists) {
      throw new CustomErrors("USER_ALREADY_EXISTS");
    }
    const hashedPassword = await bcrypt.hash(info.password, 10);
    const newUser = await UserModel.create({
      identification: info.identification,
      name: info.name,
      last_name: info.last_name,
      email: info.email,
      age: info.age,
      role: info.role,
      password: hashedPassword,
    });
    await UserModel.save(newUser);

    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  } catch (error: any) {
    throw new CustomErrors("SIGNUP_FAILED");
  }
};

//Funciones auxiliares

const validateLoginInfo = (info: LoginInfo): void => {
  if (!info.email || !info.password) {
    throw new CustomErrors("ALL_FIELDS_REQUIRED");
  }
};

const findUserByEmail = async (email: string): Promise<User> => {
  const user = await UserModel.findOneBy({ email });
  if (!user) {
    throw new CustomErrors("USER_NOT_FOUND");
  }
  return user;
};

const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
): Promise<void> => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  if (!isMatch) {
    throw new CustomErrors("AUTHENTICATION_FAILED");
  }
};

const generateToken = (user: User): string => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET ?? "",
    {
      expiresIn: "1h",
    }
  );
};
