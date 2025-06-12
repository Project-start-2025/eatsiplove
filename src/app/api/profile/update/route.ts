import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth"; // đường dẫn tùy project
import { getUserById } from "@/lib/user";
import { getDataSource } from "@/lib/orm";
import { Account } from "@/models/BE/Account";
export async function POST(req: NextRequest) {
  try {
    const userPayload = await getUserFromRequest(req);
    if (!userPayload) {
      return NextResponse.json({ message: "Chưa đăng nhập" }, { status: 401 });
    }

    const { fullname } = await req.json();

    if (!fullname || fullname.trim() === "") {
      return NextResponse.json({ message: "Họ và tên không hợp lệ" }, { status: 400 });
    }

    const user = await getUserById(userPayload.id);
    if (!user) {
      return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
    }

    user.fullName = fullname.trim();

    const dataSource = await getDataSource();
    await dataSource.getRepository(Account).save(user);

    // Trả về dữ liệu đã chuẩn hóa để client dễ xử lý
    const updatedUserData = {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
    };

    return NextResponse.json({ user: updatedUserData });
  } catch (error) {
    console.error("Lỗi update profile:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}