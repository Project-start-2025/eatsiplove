import { getDataSource } from "@/lib/orm";
import { Account } from "@/models/BE/Account";

export async function getUserById(id: number): Promise<Account | null> {
  const dataSource = await getDataSource();
  const userRepo = dataSource.getRepository(Account);
  const user = await userRepo.findOneBy({ id });
  return user;
}