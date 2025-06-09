import {Entity,PrimaryGeneratedColumn,Column, CreateDateColumn,ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Restaurant } from "./Restaurant/Restaurant";
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
    @Column({ type: "nvarchar", length: "max", nullable: true })
    images!: string; 
    @CreateDateColumn({ type: "datetime2" })
    createdAt!: Date;

    @ManyToOne(() => Restaurant) //Một cửa hàng có nhiều món ăn
    @JoinColumn({ name: "restaurantId" })
    restaurant!: Restaurant; //Món ăn phải thuộc cửa hàng

    @ManyToOne(() => Category) // Một thể loại có nhiều món ăn
    @JoinColumn({ name: "categoryId" })
    category!: Category;
    // @OneToMany(() => Review, review => review.product)
    // reviews!: Review[];
    // @OneToMany(() => OrderOnProduct, o => o.product)
    // orderItems!: OrderOnProduct[];
  }