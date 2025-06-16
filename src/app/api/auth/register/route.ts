import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getDataSource } from "@/lib/orm";
import { Account } from "@/models/BE/Account";
import { AccountRole } from "@/models/BE/AccountRole";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Received body:", body);
    const { fullName, username, password, role } = body;
 
    const validRoles = [AccountRole.CUSTOMER, AccountRole.VENDOR, AccountRole.ADMIN];
    const selectedRole = role && validRoles.includes(role) ? role : AccountRole.CUSTOMER;

    if (!fullName || !username || !password) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const ds = await getDataSource();
    console.log("DataSource initialized:", ds.isInitialized);

    const accountRepo = ds.getRepository(Account);

    const found = await accountRepo.findOneBy({ username });
    if (found) {
      return NextResponse.json({ message: "Username already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log("Password hashed");

    const account = accountRepo.create({
      fullName,
      username,
      passwordHash,
      role: selectedRole,
    });
    console.log("Account created entity:", account);

    await accountRepo.save(account);
    console.log("Account saved");

    return NextResponse.json({ message: "Account created successfully" }, { status: 201 });
  } catch (e) {
    console.error("Error in POST /api/auth/register:", e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}