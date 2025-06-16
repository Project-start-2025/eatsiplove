// app/api/user/route.ts hoặc pages/api/user.ts tùy setup Next.js version
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserById } from "@/lib/user";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number };

    const user = await getUserById(payload.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Chắc chắn trả về createdAt dưới dạng string ISO
    return NextResponse.json({
      user: {
        ...user,
        fullname: user.fullName,
        createdAt:
          user.createdAt instanceof Date
            ? user.createdAt.toISOString()
            : user.createdAt || null,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}