// app/vendor/layout.tsx

import React from "react";
import VendorNav from "../components/vendor/VendorNav";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <VendorNav />
      <main className="p-4">{children}</main>
    </div>
  );
}
