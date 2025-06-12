import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from "typeorm";

import { Restaurant } from "./Restaurant"; 

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  fullName!: string;

  @Column({ unique: true })
  username!: string;

  @Column()
  passwordHash!: string;

  @Column({ default: "user" })
  role!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Restaurant, restaurant => restaurant.account)
  restaurants!: Restaurant[];
}