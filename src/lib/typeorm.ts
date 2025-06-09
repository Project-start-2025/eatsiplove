import { DataSource } from "typeorm";
import { Account } from "@/models/BE/Account";
import { Food } from "@/models/BE/Food";
import { Cart } from "@/models/BE/Cart";
import { CartItem } from "@/models/BE/Cart";
import { Order } from "@/models/BE/Order";
import { OrderItem } from "@/models/BE/Order";
import { Restaurant } from "@/models/BE/Restaurant/Restaurant";
import { RestaurantRequest } from "@/models/BE/Restaurant/RestaurantRequest";
import { Category } from "@/models/BE/Category";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_SERVER,
  port: 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Food, Account, 
    Cart, CartItem, 
    Order, OrderItem,
    Restaurant,RestaurantRequest,
    Category
  ],
  synchronize: true,
  options: { encrypt: true }
});