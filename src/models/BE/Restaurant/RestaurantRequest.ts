import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class RestaurantRequest {
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

  @Column({ type: "bit", default: false })
  restaurantStatus!: boolean;

  @CreateDateColumn({ type: "datetime2" })
  createdAt!: Date;
}
