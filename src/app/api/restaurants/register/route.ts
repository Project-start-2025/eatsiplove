import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import { Restaurant } from "@/models/BE/Restaurant";
import { getUserById } from "@/lib/user";   
import { getUserFromRequest } from "@/lib/auth";


export async function POST(req: NextRequest) {
  try {
    const userToken = await getUserFromRequest(req);
    if (!userToken) {
      return NextResponse.json({ message: "Vui lòng đăng nhập" }, { status: 401 });
    }

    const { name, address, phone, openTime, closeTime } = await req.json();

    if (!name || !address || !phone || !openTime || !closeTime) {
      return NextResponse.json({ message: "Vui lòng điền đầy đủ thông tin" }, { status: 400 });
    }

    // Dùng hàm getUserById bạn đã viết để lấy user
    const user = await getUserById(userToken.id);
    if (!user) {
      return NextResponse.json({ message: "Tài khoản không hợp lệ" }, { status: 401 });
    }

    const ds = await getDataSource();
    const restaurantRepo = ds.getRepository(Restaurant);

    const newRestaurant = restaurantRepo.create({
      name,
      address,
      phone,
      openTime,
      closeTime,
      isApproved: false,
      account: user,
    });

    await restaurantRepo.save(newRestaurant);

    return NextResponse.json({ message: "Đăng ký nhà hàng thành công, chờ duyệt" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}