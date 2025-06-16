import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import { Restaurant } from "@/models/BE/Restaurant";

export async function GET() {
  try {
    const ds = await getDataSource();
    const restaurantRepo = ds.getRepository(Restaurant);

    // Tìm tất cả nhà hàng chưa được duyệt
    const pendingRestaurants = await restaurantRepo.find({
      where: { isApproved: false },
      relations: ["account"], // nếu cần thông tin user tạo
    });

    return NextResponse.json(pendingRestaurants, { status: 200 });
  } catch (error) {
    console.error("Error fetching pending restaurants:", error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}