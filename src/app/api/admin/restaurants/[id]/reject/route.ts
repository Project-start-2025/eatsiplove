import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import { Restaurant } from "@/models/BE/Restaurant";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const ds = await getDataSource();
    const restaurantRepo = ds.getRepository(Restaurant);

    const rawId = params.id;
    const id = Number(rawId);
    if (isNaN(id)) {
      return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
    }

    const restaurant = await restaurantRepo.findOneBy({ id });

    if (!restaurant) {
      return NextResponse.json({ message: "Nhà hàng không tồn tại" }, { status: 404 });
    }

    // Cập nhật trạng thái từ chối duyệt
    restaurant.isApproved = false;
    await restaurantRepo.save(restaurant);

    // Lưu ý: Không đổi role người dùng

    return NextResponse.json({ message: "Nhà hàng đã bị từ chối" }, { status: 200 });
  } catch (error) {
    console.error("Error reject restaurant:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}