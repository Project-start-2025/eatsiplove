import { NextRequest, NextResponse } from "next/server";
import { Food } from "@/models/BE/Food";
import { Account } from "@/models/BE/Account";
import { getDataSource } from "@/lib/orm";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, images, stock, averageRating, userId } = body;

    if (!name || !description || price == null || !Array.isArray(images) || images.length === 0 /* hoặc !userId */) {
      return NextResponse.json({ error: "Thiếu thông tin sản phẩm!" }, { status: 400 });
    }

    const dataSource = await getDataSource();
    const productRepo = dataSource.getRepository(Food);

    // Check user
    const user = await dataSource.getRepository(Account).findOneBy({ id: Number(userId) });
    if (!user) return NextResponse.json({ error: "User không tồn tại!" }, { status: 400 });
    
    // Debug xem dữ liệu images về có đúng chưa
    if (typeof images[0]?.url !== "string" || typeof images[0]?.public_id !== "string") {
      return NextResponse.json({ error: "Dữ liệu images sai định dạng!" }, { status: 400 });
    }

    const food = new Food();
    food.name = name;
    food.description = description;
    food.price = parseFloat(price);
    food.stock = stock ?? 0;
    food.averageRating = averageRating ?? 0;
    food.images = JSON.stringify(images);
    food.user = user;

    await productRepo.save(food);

    return NextResponse.json({
      ok: true,
      product: {
        ...food,
        images: images,
        user: { id: user.id, email: user.fullName },
      }
    });

  } catch (err: any) {
    console.error("Product API Error:", err); // <<< Thêm dòng này để xem chi tiết lỗi
    return NextResponse.json({ error: "Lỗi tạo sản phẩm", details: err?.stack || err?.message || err }, { status: 500 });
  }
}