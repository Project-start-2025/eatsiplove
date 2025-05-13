"use client"; // Vì có state và event handler

import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Xử lý đăng nhập ở đây, gọi API hoặc logic tương ứng
    alert(`Đăng nhập với email: ${email}\nMật khẩu: ${password}`);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <label htmlFor="email" style={styles.label}>
        Email
      </label>
      <input
        type="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email"
        style={styles.input}
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
      />
      <Link
        href="/Register" // Đường dẫn trang đăng ký
        style={{
          display: "block",
          width: "100%", // full width để dễ bấm trong dropdown
          padding: "8px 12px", // padding cho cảm giác đủ không gian bấm
          fontWeight: "600",
          fontSize: "14px",
          color: "#333",
          textDecoration: "none",
          textAlign: "left",
          cursor: "pointer",
          borderRadius: "4px", // bo góc nhẹ cho đẹp khi hover
          transition: "background-color 0.2s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "#F9C74F";
          (e.currentTarget as HTMLElement).style.color = "#1c1c1c";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor =
            "transparent";
          (e.currentTarget as HTMLElement).style.color = "#333";
        }}
      >
        Đăng ký
      </Link>
      <button type="submit" style={styles.button}>
        Đăng nhập
      </button>
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "30px 40px",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  label: {
    fontWeight: 600,
    fontSize: "14px",
    color: "#5a381e",
  },
  input: {
    padding: "10px 12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    backgroundColor: "#F9C74F",
    border: "none",
    borderRadius: "25px",
    padding: "12px",
    fontWeight: "700",
    fontSize: "16px",
    color: "#1c1c1c",
    cursor: "pointer",
    marginTop: "8px",
    transition: "background-color 0.3s",
  },
};

export default LoginForm;
