import { FrequencyPayment } from "@/models/frequencyPayment";
import { Role } from "@/models/role.enum";
import { StatusLoan } from "@/models/statusloan.enum";
import { Expose, Type } from "class-transformer";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDate,
  IsEnum,
  IsEmail,
  ValidateNested,
  IsEmpty,
  IsOptional,
  Min,
  Max,
  IsDecimal,
} from "class-validator";

export class CreateLoanDTO {
  @Expose()
  @IsString({
    message: "Debe ingresar un nombre válido",
  })
  @IsNotEmpty({
    message: "El nombre es requerido",
  })
  debtor_name: string;

  @Expose()
  @IsString({
    message: "Debe ingresar un apellido válido",
  })
  @IsNotEmpty({
    message: "El apellido es requerido",
  })
  debtor_last_name: string;

  @Expose()
  @IsString({
    message: "Debe ingresar una identificación válida",
  })
  @IsNotEmpty({
    message: "La identificación es requerida",
  })
  debtor_identification: string;

  @Expose()
  @IsEmail({}, { message: "Debe ingresar un correo válido" })
  @IsNotEmpty({
    message: "El correo es requerido",
  })
  debtor_email: string;

  @Expose()
  @IsNumber({}, { message: "Debe ingresar una edad válida" })
  @Min(18, { message: "La edad mínima es 18 años" })
  @IsOptional()
  debtor_age: number;

  @Expose()
  @IsEnum(Role, { message: "Debe ingresar un rol válido" })
  debtor_role: Role;

  @Expose()
  @IsNumber({}, { message: "Debe ingresar un monto válido" })
  @IsNotEmpty({
    message: "El monto es requerido",
  })
  @Min(1, { message: "El monto mínimo es 1" })
  @Max(10000000, { message: "El monto máximo es 10000000" })
  amount: number;

  @Expose()
  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: "Debe ingresar una tasa de interés de máximo dos decimales" }
  )
  @Min(0, { message: "La tasa de interés mínima es 0" })
  @Max(99, { message: "La tasa de interés máxima es 100" })
  @IsNotEmpty()
  interest_rate: number;

  @Expose()
  @IsDate({
    message: "Debe ingresar una fecha de inicio válida",
  })
  @Type(() => Date)
  @IsNotEmpty()
  start_date: Date;

  @Expose()
  @IsDate({
    message: "Debe ingresar una fecha de finalización válida",
  })
  @Type(() => Date)
  @IsNotEmpty()
  end_date: Date;

  @Expose()
  @IsNotEmpty({
    message: "La frecuencia de pago es requerida",
  })
  @IsEnum(FrequencyPayment, { message: "Debe ingresar una frecuencia válida" })
  frequency_payment: FrequencyPayment;

  @Expose()
  @IsEnum(StatusLoan, { message: "Debe ingresar un estado válido" })
  status: StatusLoan;
}
