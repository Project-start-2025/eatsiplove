import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { Restaurant } from "./Restaurant";
@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column({ type: "text" })
  description!: string;
  @Column({ type: "float" })
  price!: number;
  @Column({ type: "nvarchar", length: "max", nullable: true })
  images!: string;
  @Column({ default: 0 })
  stock!: number;
  @Column({ type: "float", default: 0 })
  averageRating!: number;
  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;
  @ManyToOne(() => Restaurant)
  @JoinColumn({ name: "restaurantId" })
  restaurant!: Restaurant;
}
