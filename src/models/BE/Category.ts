import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;


  @Column({ type: "text", nullable: true })
  imagesUrlsJson?: string;
}