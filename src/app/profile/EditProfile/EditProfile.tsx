"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "../../Context/UserContext";

export default function EditProfile() {
  const router = useRouter(); // Khai báo useRouter
  const { user, setUser } = useUser();

  // Local state để edit
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [username, setUsername] = useState(user?.username || "");
  const [role] = useState(user?.role || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Khi user đổi (ví dụ reload) thì cập nhật lại form
    setFullname(user?.fullname || "");
    setUsername(user?.username || "");
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/profile/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, username }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Cập nhật thất bại");
      }

      const data = await res.json();

      // Cập nhật lại user trong context
      setUser(data.user);

      setMessage("Cập nhật thông tin thành công!");

      // Chờ 1s rồi quay lại trang trước
      setTimeout(() => {
        router.back();
      }, 1000);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Đã có lỗi xảy ra vui lòng thử lại."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <p>Đang tải thông tin...</p>;

  return (
    <section style={{ maxWidth: 500, margin: "0 auto", padding: 20 }}>
      <h2 style={{ color: "#4a90e2", marginBottom: 20 }}>
        Chỉnh sửa thông tin cá nhân
      </h2>

      {message && (
        <p
          style={{
            color: message.includes("thành công") ? "green" : "red",
            marginBottom: 10,
          }}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Họ và tên:
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              boxSizing: "border-box",
            }}
            required
          />
        </label>

        <label style={{ display: "block", marginBottom: 8 }}>
          Tên đăng nhập:
          <input
            type="email"
            value={username}
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              boxSizing: "border-box",
            }}
            disabled
          />
        </label>

        <label style={{ display: "block", marginBottom: 16 }}>
          Vai trò:
          <input
            type="text"
            value={role}
            readOnly
            style={{
              width: "100%",
              padding: 8,
              marginTop: 4,
              boxSizing: "border-box",
              backgroundColor: "#eee",
            }}
          />
        </label>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#4a90e2",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: 4,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </form>
    </section>
  );
}
