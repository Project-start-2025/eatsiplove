import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
    JoinColumn,
  } from "typeorm";
import { Account } from "./Account";
import { Food } from "./Food";
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: "userId" })
  owner!: Account;

  @OneToMany(() => Food, food => food.restaurant)
  foods!: Food[];
}
