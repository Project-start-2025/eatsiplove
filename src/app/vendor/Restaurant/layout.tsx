import React from "react";
import Link from "next/link";

export default function RestaurantLayout({children}: {
    children: React.ReactNode;
}){
    return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-4">
        <h2 className="text-lg font-bold">Quản lý Cửa hàng</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/vendor/Restaurant/List" className="text-blue-600 hover:underline">
            📋 Danh sách
          </Link>
          <Link href="/vendor/Restaurant/Add" className="text-blue-600 hover:underline">
            ➕ Thêm cửa hàng
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  );
}