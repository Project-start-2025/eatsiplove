import { NextRequest, NextResponse } from 'next/server';
import { getDataSource } from '@/lib/orm';
import { Cart } from '@/models/BE/Cart';

export async function GET(req: NextRequest) {
    const userId = 1; // Giả định user đang đăng nhập có id = 1 (cần thay bằng Auth thực tế)

    const db = await getDataSource();
    const cartRepo = db.getRepository(Cart);

    let cart = await cartRepo.findOne({
        where: { account: { id: userId } },
        relations: ['items', 'items.food'],
    });

    if (!cart) {
        cart = cartRepo.create({ account: { id: userId }, items: [] });
        await cartRepo.save(cart);
    }

    return NextResponse.json(cart);
}
