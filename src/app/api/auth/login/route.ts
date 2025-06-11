import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Account } from "@/models/BE/Account";
import { getDataSource } from "@/lib/orm";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    const ds = await getDataSource();
    const accountRepo = ds.getRepository(Account);

    // Tìm user theo username/email
    const user = await accountRepo.findOneBy({ username: email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 401 });
    }

    // So sánh mật khẩu băm
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }

    // Tạo payload cho token
    const payload = {
      id: user.id,
      username: user.username,
      fullname: user.fullName,
      role: user.role,
    };

    // Tạo JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Trả token trong cookie HttpOnly (nên dùng cookie, không trả token trong body để bảo mật hơn)
    const response = NextResponse.json({
      message: "Login successful",
      user: payload, // Thông tin user trả về client
    });

    // Set cookie HttpOnly, path=/ để cookie gửi kèm toàn app
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Chỉ bật secure khi deploy thực tế (https)
      maxAge: 3600, // 1 giờ
      path: "/",
      sameSite: "lax", // hoặc 'strict' tùy mục đích
    });

    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
