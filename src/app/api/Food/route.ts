import { NextRequest, NextResponse } from "next/server";
import { Food } from "@/model/Food";
import { Account } from "@/model/Account";
import { getDataSource } from "@/lib/orm";

export async function GET(req: NextRequest) {
  try {
    const dataSource = await getDataSource();
    const foodRepo = dataSource.getRepository(Food);

    const foods = await foodRepo.find({
      relations: ["user"],
    });

    const parsedFoods = foods.map((food) => ({
      ...food,
      images: typeof food.images === "string" ? JSON.parse(food.images) : food.images,
      user: {
        id: food.user?.id,
        username: food.user?.username,
        fullName: food.user?.fullName,
        role: food.user?.role,
      },
    }));

    return NextResponse.json({ foods: parsedFoods });
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json({ error: "Lỗi lấy danh sách món ăn" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, price, images, stock, averageRating, userId } = body;

    if (
      !name ||
      !description ||
      price == null ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !images.every(
        (img) =>
          typeof img.url === "string" &&
          img.url.length > 0 &&
          typeof img.public_id === "string" &&
          img.public_id.length > 0
      )
    ) {
      return NextResponse.json(
        { error: "Thiếu hoặc sai dữ liệu sản phẩm!" },
        { status: 400 }
      );
    }

    const dataSource = await getDataSource();
    const foodRepo = dataSource.getRepository(Food);
    const accountRepo = dataSource.getRepository(Account);

    // Tìm user theo userId
    const foundUser = await accountRepo.findOneBy({ id: Number(userId) });
    if (!foundUser) {
      return NextResponse.json({ error: "User không tồn tại!" }, { status: 400 });
    }

    // Ép kiểu user thành instance Account
    const user = Object.assign(new Account(), foundUser);

    // Kiểm tra role Vendor (toLowerCase)
    if (user.role.toLowerCase() !== "vendor") {
      return NextResponse.json(
        { error: "User không có quyền thêm món ăn" },
        { status: 403 }
      );
    }

    const product = new Food();
    product.name = name;
    product.description = description;
    product.price = Number(price);
    product.stock = stock ?? 0;
    product.averageRating = averageRating ?? 0;
    product.images = JSON.stringify(images);
    product.user = user;

    await foodRepo.save(product);

    return NextResponse.json({
      ok: true,
      product: {
        ...product,
        images: images,
        user: {
          id: user.id,
          username: user.username,
          fullName: user.fullName,
          role: user.role,
        },
      },
    });
  } catch (err: any) {
    console.error("Product API Error:", err);
    return NextResponse.json(
      { error: "Lỗi tạo sản phẩm", details: err?.stack || err?.message || err },
      { status: 500 }
    );
  }
}