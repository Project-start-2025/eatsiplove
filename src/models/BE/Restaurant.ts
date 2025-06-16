import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Account } from "./Account";
import type { Account as AccountType } from "./Account"
import { RestaurantStatus } from "./RestaurantStatus";
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;


  @Column({ type: "time", nullable: true })
  openTime?: string;

  // Giờ đóng cửa, kiểu time
  @Column({ type: "time", nullable: true })
  closeTime?: string;

  @Column({ default: false })
  isApproved!: boolean;

  @ManyToOne(() => Account, account => account.restaurants)
  @JoinColumn({ name: "accountId" })
  account!: AccountType;

  @CreateDateColumn()
  createdAt!: Date;
  @Column({
    type: "varchar",
    length: 20,
    default: RestaurantStatus.Pending,
  })
  status!: RestaurantStatus;
}