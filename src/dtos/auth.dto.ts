import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @IsNotEmpty({ message: "El email es requerido" })
  @IsEmail({}, { message: "El email debe ser un email válido" })
  email: string;

  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;
}
