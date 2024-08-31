import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
  @Expose()
  @IsNotEmpty({ message: "El email es requerido" })
  @IsEmail({}, { message: "El email debe ser un email válido" })
  email: string;

  @Expose()
  @IsNotEmpty({ message: "La contraseña es requerida" })
  password: string;
}
