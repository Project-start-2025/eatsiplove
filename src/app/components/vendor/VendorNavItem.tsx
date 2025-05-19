'use client'; // Bắt buộc để dùng useRouter trong App Router

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface VendorNavItemProps {
  label: string;
  href: string;
  active?: boolean;
}

const VendorNavItem: React.FC<VendorNavItemProps> = ({ label, href, active }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push(href)}
      className={`w-full text-left px-4 py-2 rounded-md ${
        active ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
};

export default VendorNavItem;
