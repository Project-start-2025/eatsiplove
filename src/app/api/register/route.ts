import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getDataSource } from "@/lib/orm";
import { Account } from "@/model/Account";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, username, password, role } = body;

    if (!fullName || !username || !password) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const ds = await getDataSource();
    const accountRepo = ds.getRepository(Account);

    // Check username exist
    const found = await accountRepo.findOneBy({ username });
    if (found) {
      return NextResponse.json({ message: "Username already exists" }, { status: 409 });
    }

    // Hash pass
    const passwordHash = await bcrypt.hash(password, 10);

    const account = accountRepo.create({
      fullName,
      username,
      passwordHash,
      role: role || "user",
    });
    await accountRepo.save(account);

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}