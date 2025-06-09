import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Food } from "./Food";

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: number;

    @Column({ type: "nvarchar", length: "max", nullable: true })
    images!: string; 
} 