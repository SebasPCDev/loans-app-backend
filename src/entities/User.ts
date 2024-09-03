import { Role } from "../models/role.enum";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "@/entities/Loan";
import { Exclude } from "class-transformer";

//src
@Entity({
  name: "users",
})
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  identification: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  last_name: string;

  @Column({
    type: "varchar",
    length: 100,
    unique: true,
  })
  email: string;

  @Column({
    type: "int",
  })
  age: number;

  @Column({ type: "enum", enum: Role, default: Role.LENDER })
  role: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  @Exclude()
  password: string;

  @Column({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @Column({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @OneToMany(() => Loan, (loan) => loan.debtor)
  loans: Loan[];
}
