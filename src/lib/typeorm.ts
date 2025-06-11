
import { Food } from "@/models/BE/ Food";

import { Account } from "@/models/BE/Account";
import { DataSource } from "typeorm";
import { Category } from "@/models/BE/ Category";
import { Restaurant } from "@/models/BE/Restaurant";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_SERVER,
  port: 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Food, Account, Category,Restaurant],
  synchronize: true,
  options: { encrypt: true },
});
