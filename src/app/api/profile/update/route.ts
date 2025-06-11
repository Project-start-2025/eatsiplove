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

    // Lấy user từ DB dựa vào id decoded từ token
    const user = await getUserById(userPayload.id);
    if (!user) {
      return NextResponse.json({ message: "Người dùng không tồn tại" }, { status: 404 });
    }

    // Cập nhật thông tin
    user.fullName = fullname;

    const dataSource = await getDataSource();
    await dataSource.getRepository(Account).save(user);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Lỗi update profile:", error);
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}