"use client";

import { useEffect, useState } from "react";

export default function CartForm() {
    const [items, setItems] = useState<Cart[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    fetch("/api/cart")
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items);
        setLoading(false);
        })
      .catch((err) => {
        console.error("Lỗi khi tải giỏ hàng:", err);
        setLoading(false);
        });
    }, []);

    // const removeItem = async (itemId: number) => {
    //     const res = await fetch("/api/cart/remove", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ itemId }),
    //     });
    //     if (res.ok) {
    //     setItems((prev) => prev.filter((item) => item.id !== itemId));
    //     }
    // };

    // const checkout = async () => {
    // const res = await fetch("/api/cart/checkout", {
    //     method: "POST",
    //     });
    //     if (res.ok) {
    //     alert("Thanh toán thành công!");
    //     setItems([]);
    //     } else {
    //     alert("Có lỗi xảy ra khi thanh toán.");
    //     }
    // };

    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);

    if (loading) return <p>Đang tải giỏ hàng...</p>;
    
    return(
        <div className="max-w-3xl mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
            {items.length === 0 ? (
                <p>Giỏ hàng của bạn trống.</p>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border p-4 rounded">
                            <div>
                                <p className="font-semibold">{item.foodName}</p>
                                <p>Số lượng: {item.quantity}</p>
                                <p>Giá: {item.foodPrice} đ</p>
                                <p>Tổng: {item.totalPrice} đ</p>
                            </div>
                            <button /*onClick={() => removeItem(item.id)}*/ className="bg-red-500 text-white px-3 py-1 rounded">
                                Xóa
                            </button>
                        </div>
                    ))}

                    <div className="text-right font-bold text-xl mt-4">
                        Tổng cộng: {total} đ
                    </div>

                    <div className="text-right mt-2">
                        <button /*onClick={checkout}*/ className="bg-green-600 text-white px-4 py-2 rounded">
                            Thanh toán
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
