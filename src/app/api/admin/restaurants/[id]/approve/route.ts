import { NextRequest, NextResponse } from "next/server";
import { getUserFromRequest } from "@/lib/auth";
import { getUserById } from "@/lib/user";
import { AppDataSource } from "@/lib/typeorm";
import { Restaurant } from "@/models/BE/Restaurant";
import { RestaurantStatus } from "@/models/BE/RestaurantStatus";
import { AccountRole } from "@/models/BE/Account";


export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1. Kiểm tra quyền admin
  const decodedUser = await getUserFromRequest(req);
  if (!decodedUser) {
    return NextResponse.json({ message: "Bạn chưa đăng nhập" }, { status: 401 });
  }
  const user = await getUserById(decodedUser.id);
  if (!user || user.role !== AccountRole.ADMIN) {
    return NextResponse.json({ message: "Bạn không có quyền truy cập" }, { status: 403 });
  }

  const restaurantId = Number(params.id);
  if (isNaN(restaurantId)) {
    return NextResponse.json({ message: "ID không hợp lệ" }, { status: 400 });
  }

  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const accountRepo = AppDataSource.getRepository(user.constructor); // Lấy repository Account từ instance user

  // 2. Lấy nhà hàng kèm quan hệ account (chủ nhà hàng)
  const restaurant = await restaurantRepo.findOne({
    where: { id: restaurantId },
    relations: ["account"],
  });
  if (!restaurant) {
    return NextResponse.json({ message: "Không tìm thấy nhà hàng" }, { status: 404 });
  }
  if (restaurant.status !== RestaurantStatus.Pending) {
    return NextResponse.json({
      message: "Nhà hàng không ở trạng thái chờ duyệt",
      currentStatus: restaurant.status,
    }, { status: 400 });
  }

  if (!restaurant.account) {
    return NextResponse.json({ message: "Nhà hàng chưa có chủ" }, { status: 500 });
  }

  // 3. Cập nhật trạng thái nhà hàng
  restaurant.status = RestaurantStatus.Approved;
  await restaurantRepo.save(restaurant);

  // 4. Cập nhật role chủ nhà hàng nếu chưa phải vendor
  if (restaurant.account.role !== AccountRole.VENDOR) {
    restaurant.account.role = AccountRole.VENDOR;
    await accountRepo.save(restaurant.account);
  }

  return NextResponse.json({ message: "Duyệt nhà hàng thành công" });
}