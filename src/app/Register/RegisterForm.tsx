"use client";

import { useState } from "react";
import Link from "next/link";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ fullName, username, password, role: "user" }),
      });

      if (res.ok) {
        setMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setFullName("");
        setUsername("");
        setPassword("");
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

      {/* Nếu muốn chọn role, bạn có thể thêm dropdown ở đây */}

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

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 16,
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: "40px 30px",
    borderRadius: 12,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    marginBottom: 8,
    color: "#5a381e",
    fontWeight: "700",
    textAlign: "center",
  },
  label: {
    fontWeight: 600,
    fontSize: 14,
    color: "#5a381e",
  },
  input: {
    padding: "10px 12px",
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    backgroundColor: "#F9C74F",
    border: "none",
    borderRadius: 25,
    padding: 12,
    fontWeight: "700",
    fontSize: 16,
    color: "#1c1c1c",
    cursor: "pointer",
    marginTop: 8,
    transition: "background-color 0.3s",
  },
};

export default RegisterForm;