import { Role } from "@/models/role.enum";
import { Exclude, Expose } from "class-transformer";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from "class-validator";

export class CreateUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  identification: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @Expose()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Expose()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, {
    message:
      "La contraseña debe tener al menos una minúscula, una mayúscula, un número y un caracter especial (!@#$%^&*)",
  })
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @IsEnum(Role, { message: "Debe ser un rol válido" })
  role: Role = Role.LENDER;
}

export class UpdateUserDto {
  @Expose()
  @IsOptional()
  @IsString()
  identification: string;

  @Expose()
  @IsOptional()
  @IsString()
  name: string;

  @Expose()
  @IsOptional()
  @IsString()
  last_name: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  age: number;

  @Expose()
  @IsOptional()
  @IsEmail()
  email: string;
}
