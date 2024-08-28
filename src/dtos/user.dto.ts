import { Role } from "@/models/role.enum";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      "La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*)",
  })
  password: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsEnum(Role, { message: "Debe ser un rol válido" })
  role: Role = Role.LENDER;
}
