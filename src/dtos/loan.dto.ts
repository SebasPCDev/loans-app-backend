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
} from "class-validator";

export class CreateLoanDTO {
  @Expose()
  @IsString()
  @IsNotEmpty()
  debtor_name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  debtor_last_name: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  debtor_identification: string;

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  debtor_email: string;

  @Expose()
  @IsNumber()
  @IsOptional()
  debtor_age: number;

  @Expose()
  @IsEnum(Role)
  debtor_role: Role;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  interest_rate: string;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  start_date: Date;

  @Expose()
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  end_date: Date;

  @Expose()
  @IsNotEmpty()
  @IsEnum(FrequencyPayment)
  frequency_payment: FrequencyPayment;

  @Expose()
  @IsEnum(StatusLoan)
  status: StatusLoan;
}
