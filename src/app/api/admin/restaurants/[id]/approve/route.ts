import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import { Restaurant } from "@/models/BE/Restaurant";
import { getUserFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    const restaurantId = Number(params.id);
    if (isNaN(restaurantId)) {
      return NextResponse.json({ message: "Id không hợp lệ" }, { status: 400 });
    }

    const ds = await getDataSource();
    const restaurantRepo = ds.getRepository(Restaurant);

    const restaurant = await restaurantRepo.findOneBy({ id: restaurantId });
    if (!restaurant) {
      return NextResponse.json({ message: "Nhà hàng không tồn tại" }, { status: 404 });
    }

    restaurant.isApproved = true;
    await restaurantRepo.save(restaurant);

    return NextResponse.json({ message: "Duyệt nhà hàng thành công" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}