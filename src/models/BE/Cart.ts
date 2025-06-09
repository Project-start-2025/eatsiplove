import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, JoinColumn } from "typeorm";
import { Account } from "./Account";
import { Food } from "./Food";

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Account)
    @JoinColumn({ name: "idAccount" })
    account!: Account;

    @OneToMany(() => CartItem, (item) => item.cart)
    items!: CartItem[];

    @CreateDateColumn({ type: "datetime2" })
    createdAt!: Date;
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, (cart) => cart.items)
  cart!: Cart;

  @ManyToOne(() => Food)
  food!: Food;

  @Column()
  quantity!: number;
}