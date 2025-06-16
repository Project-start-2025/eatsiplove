import { AppDataSource } from "./typeorm";
import "reflect-metadata";
export async function getDataSource() {
  if (!AppDataSource.isInitialized) {
    try {
      await AppDataSource.initialize();
    } catch (error) {
      console.error("Failed to initialize DataSource:", error);
      throw error;
    }
  }
  return AppDataSource;
}
