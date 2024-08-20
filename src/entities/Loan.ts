import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "@/entities/User";
import { Payment } from "@/entities/Payment";
import { StatusLoan } from "../models/statusloan.enum";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "lender_id" })
  lender: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: "debtor_id" })
  debtor: User;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column("decimal", { precision: 5, scale: 2 })
  interest_rate: number;

  @Column("date")
  start_date: string;

  @Column("date")
  end_date: string;

  @Column("varchar")
  payment_frequency: string;

  @Column("decimal", { precision: 10, scale: 2 })
  total_repayment: number;

  @Column("decimal", { precision: 10, scale: 2 })
  remaining_balance: number;

  @Column({
    type: "enum",
    enum: StatusLoan,
  })
  status: string;

  @OneToMany(() => Payment, (payment) => payment.loan)
  payments: Payment[];

  @CreateDateColumn({
    name: "created_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamptz",
    default: () => "CURRENT_TIMESTAMP",
  })
  updated_at: Date;
}
