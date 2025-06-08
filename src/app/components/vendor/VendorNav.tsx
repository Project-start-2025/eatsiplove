// components/VendorNav.tsx
import React from "react";
import VendorNavItem from "./VendorNavItem";

const VendorNav = () => {
  return (
    <nav className="bg-white border-b shadow-sm px-4 py-3 flex space-x-4">
      <VendorNavItem href="/vendor/Add-Food" label="➕ Thêm sản phẩm" />
      <VendorNavItem href="/vendor/statistics" label="📊 Thống kê doanh số" />
    </nav>
  );
};

export default VendorNav;
