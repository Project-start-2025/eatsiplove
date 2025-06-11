import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Account } from "./Account"; // import entity Account tương ứng

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

  @Column({ type: "time" })
  openTime!: Date;

  @Column({ type: "time" })
  closeTime!: Date;

  // Trạng thái nhà hàng có được duyệt bởi admin không
  @Column({ type: "bit", default: false })
  isApproved!: boolean;

  // Quan hệ nhiều nhà hàng thuộc một tài khoản
  @ManyToOne(() => Account, (account) => account.restaurants)
  owner!: Account;

  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;
}