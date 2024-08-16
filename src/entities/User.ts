import { Role } from "../models/role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  @Column({ type: "enum", enum: Role })
  role: string;

  @Column({
    type: "varchar",
    length: 100,
  })
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
}
