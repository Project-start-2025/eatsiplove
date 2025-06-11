import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
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

  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;

  @OneToMany(() => Restaurant, (restaurant) => restaurant.owner)
  restaurants!: Restaurant[];
}
