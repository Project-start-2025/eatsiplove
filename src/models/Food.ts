import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { FoodImage, type FoodImage as FoodImageType } from "./FoodImage";
import { Restaurant } from "./Restaurant";
import { Category } from "./Category";


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

  @Column({ default: 0 })
  stock!: number;

  @OneToMany(() => FoodImage, image => image.food)
  images!: FoodImageType[];
  @ManyToOne(() => Category, { nullable: false })
  category!: Category;

  @ManyToOne(() => Restaurant, { nullable: false })
  restaurant!: Restaurant;
}