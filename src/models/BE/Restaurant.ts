import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";

import { Account } from "./Account";

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Account, account => account.restaurants)
  @JoinColumn({ name: "accountId" })
  account!: Account;

  @Column({ nullable: true })
  openTime?: string;

  @Column({ nullable: true })
  closeTime?: string;

  @Column({ default: false })
  isApproved!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}