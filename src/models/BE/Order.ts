// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   ManyToOne,
//   OneToMany,
//   CreateDateColumn,
//   JoinColumn,
// } from "typeorm";
// import { Account } from "./Account";
// import { Food } from "./ Food";

// @Entity()
// export class Order {
//   @PrimaryGeneratedColumn()
//   id!: number;

//   @ManyToOne(() => Account)
//   @JoinColumn({ name: "idAccount" })
//   account!: Account;

//   @Column({ type: "decimal", precision: 10, scale: 2 })
//   totalAmount!: number;

//   @Column({ default: "pending" })
//   status!: "pending" | "paid" | "cancelled";

//   @OneToMany(() => OrderItem, (item) => item.order)
//   items!: OrderItem[];

//   @CreateDateColumn({ type: "datetime2" })
//   createdAt!: Date;
// }
