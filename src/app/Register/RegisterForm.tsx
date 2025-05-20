"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import styles from "@/styles/styles.LoginForm";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();
  // Có thể thêm role nếu cần, hoặc mặc định "user"
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, role}),
      });

      if (res.ok) {
        setMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setFullName("");
        setUsername("");
        setPassword("");
        setTimeout(()=>{
          router.push("/Login");
        },1500)

      } else if (res.status === 409) {
        setMessage("Tên đăng nhập đã tồn tại. Vui lòng chọn tên khác.");
      } else if (res.status === 400) {
        setMessage("Vui lòng điền đầy đủ thông tin.");
      } else {
        setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } catch (error) {
      setMessage("Lỗi kết nối server. Vui lòng thử lại sau.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Đăng ký tài khoản</h2>

      <label htmlFor="fullName" style={styles.label}>
        Họ và tên
      </label>
      <input
        type="text"
        id="fullName"
        required
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        placeholder="Nhập họ và tên"
        style={styles.input}
        disabled={loading}
      />

      <label htmlFor="username" style={styles.label}>
        Tên đăng nhập
      </label>
      <input
        type="text"
        id="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Nhập tên đăng nhập"
        style={styles.input}
        disabled={loading}
      />

      <label htmlFor="password" style={styles.label}>
        Mật khẩu
      </label>
      <input
        type="password"
        id="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Nhập mật khẩu"
        style={styles.input}
        disabled={loading}
      />

      <label htmlFor="role" style={styles.label}>
        Vai trò
      </label>
      <select
        id="role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={styles.select}
        disabled={loading}
      >
        <option value="customer">Khách hàng</option>
        <option value="vendor">Quản lý nhà hàng</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Đang đăng ký..." : "Đăng ký"}
      </button>

      {message && (
        <p
          style={{
            marginTop: 12,
            color: message.includes("thành công") ? "green" : "red",
            fontWeight: 600,
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: 16, fontSize: 14, color: "#666" }}>
        Bạn đã có tài khoản?{" "}
        <Link href="/Login" style={{ color: "#F9C74F", fontWeight: "600" }}>
          Đăng nhập ngay
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
