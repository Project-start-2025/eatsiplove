import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn, 
} from "typeorm";
import { AccountRole } from "./AccountRole";
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

  @Column({
    type: "varchar",
    length: 20,
    default: AccountRole.CUSTOMER,
  })
  role!: AccountRole;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Restaurant, restaurant => restaurant.account)
  restaurants!: Restaurant[];
}

export { AccountRole };
