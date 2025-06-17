import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  import { Food } from "./Food";
  import type { Food as FoodType } from "./Food";
  
  @Entity()
  export class FoodImage {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ type: "text" })
    imageURL!: string;
  
    @ManyToOne(() => Food, food => food.images, { onDelete: "CASCADE", nullable: false })
    @JoinColumn({ name: "foodId" })
    food!: FoodType;  
  }