import { UserModel } from "@/config/data-sourcer";
import { User } from "@/entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface LoginInfo {
  email: string;
  password: string;
}

interface LoginResponse {
  user: Omit<User, "password">;
  token: string;
}

export const loginService = async (info: LoginInfo): Promise<LoginResponse> => {
  try {
    validateLoginInfo(info);

    const user = await findUserByEmail(info.email);
    await verifyPassword(info.password, user.password);

    const token = generateToken(user);

    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  } catch (error: any) {
    // Log the error or send it to an error tracking service
    throw new Error(`Login failed: ${error.message}`);
  }
};

export const signupService = async (info: any): Promise<User> => {
  try {
    const emailExists = await UserModel.findOneBy({ email: info.email });
    if (emailExists) {
      throw new Error("User already exists");
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
  } catch (error: any) {
    throw new Error(`Signup failed: ${error.message}`);
  }
};

const validateLoginInfo = (info: LoginInfo): void => {
  if (!info.email || !info.password) {
    throw new Error("All fields are required");
  }
};

const findUserByEmail = async (email: string): Promise<User> => {
  const user = await UserModel.findOneBy({ email });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
): Promise<void> => {
  const isMatch = await bcrypt.compare(inputPassword, storedPassword);
  if (!isMatch) {
    throw new Error("Invalid password");
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
