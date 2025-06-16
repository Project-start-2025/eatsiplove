

import { Account } from "@/models/BE/Account";
import { Category } from "@/models/BE/Category";
import { Food } from "@/models/BE/Food";
import { FoodImage } from "@/models/BE/FoodImage";
import { Restaurant } from "@/models/BE/Restaurant";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_SERVER,
  port: 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Account, Restaurant, Food, FoodImage, Category],
  synchronize: true,
  options: {
    encrypt: true,
  },
  logging: false,
});