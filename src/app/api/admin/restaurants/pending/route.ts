import { NextRequest, NextResponse } from "next/server";
import { getDataSource } from "@/lib/orm";
import { Restaurant } from "@/models/BE/Restaurant";
import { getUserFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req);
    if (!user || user.role !== "admin") {
      return NextResponse.json({ message: "Không có quyền truy cập" }, { status: 403 });
    }

    const ds = await getDataSource();
    const restaurantRepo = ds.getRepository(Restaurant);

    const pendingList = await restaurantRepo.find({
      where: { isApproved: false },
      relations: ["account"],
    });

    return NextResponse.json(pendingList);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Lỗi máy chủ" }, { status: 500 });
  }
}