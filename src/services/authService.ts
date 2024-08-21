import { UserModel } from "@/config/data-sourcer";
import { User } from "@/entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginService = async (
  info: any
): Promise<{ user: User; token: string }> => {
  console.log(info);
  if (!info.email || !info.password) {
    throw new Error("All fields are required");
  }
  const user = await UserModel.findOneBy({
    email: info.email,
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(info.password, user.password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET ?? "",
    {
      expiresIn: "1h",
    }
  );

  return { user, token };
};
