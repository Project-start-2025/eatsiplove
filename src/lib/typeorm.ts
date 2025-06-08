import { DataSource } from "typeorm";
import { Account } from "@/model/Account";
import { Food } from "@/model/Food";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: process.env.DB_SERVER,
  port: 1433,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Food, Account],
  synchronize: true,
  options: { encrypt: true },
});
