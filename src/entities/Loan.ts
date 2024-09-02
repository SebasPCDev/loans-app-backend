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
import { FrequencyPayment } from "@/models/frequencyPayment";

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

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  interest_rate: number;

  @Column({ type: "date" })
  start_date: string;

  @Column({ type: "date" })
  end_date: string;

  @Column({
    type: "enum",
    enum: FrequencyPayment,
    default: FrequencyPayment.MONTHLY,
  })
  payment_frequency: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
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
