import React, { ReactNode } from "react";
import Link from "next/link";
import Button from "../components/UI/Button";
type ProfileLayoutProps = {
  children: ReactNode;
};

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <div
      style={{
        maxWidth: 720,
        margin: "40px auto",
        padding: 24,
        boxShadow: "0 6px 24px rgb(0 0 0 / 0.12)",
        borderRadius: 16,
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: "#333",
      }}
    >
      <header
        style={{
          marginBottom: 34,
          borderBottom: "3px solid #4a90e2",
          paddingBottom: 12,
        }}
      >
        <h1
          style={{
            margin: 0,
            color: "#4a90e2",
            fontWeight: 700,
            fontSize: 28,
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          👤 Thông tin cá nhân
        </h1>

        <nav style={{ marginTop: 14 }}>
          <Link href="/profile/EditProfile" style={navLinkStyle}>
            Chỉnh sửa cá nhân
          </Link>
          <Link href="/profile/history" style={navLinkStyle}>
            Lịch sử đơn hàng
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}

const navLinkStyle: React.CSSProperties = {
  marginRight: 24,
  color: "#4a90e2",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: 16,
  cursor: "pointer",
  transition: "color 0.3s ease",
};
