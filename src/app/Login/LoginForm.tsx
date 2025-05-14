"use client";

import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        setMessage("Đăng nhập đúng, chào mừng!");
      } else if (res.status === 401 || res.status === 403) {
        setMessage("Email hoặc mật khẩu không đúng. Không thể truy cập.");
      } else {
        setMessage("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } catch (error) {
      setMessage("Lỗi kết nối server. Vui lòng thử lại sau.");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form} noValidate>
      <h2 style={styles.title}>Đăng nhập</h2>

      <label htmlFor="email" style={styles.label}>
        Email
      </label>
      <input
        type="email"
        id="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        style={styles.input}
        disabled={loading}
        autoComplete="email"
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
        autoComplete="current-password"
      />

      <div style={styles.footer}>
        <Link href="/Register" style={styles.registerLink}>
          Bạn chưa có tài khoản? Đăng ký ngay
        </Link>
      </div>

      <button type="submit" style={loading ? styles.buttonLoading : styles.button} disabled={loading}>
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>

      {message && (
        <p style={message.includes("đăng nhập đúng") ? styles.successMsg : styles.errorMsg}>
          {message}
        </p>
      )}
    </form>
  );
};

const styles: Record<string, React.CSSProperties> = {
  form: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "40px 44px",
    borderRadius: 20,
    backgroundColor: "#fff",
    boxShadow:
      "0 16px 32px rgb(0 0 0 / 0.12), 0 4px 16px rgb(0 0 0 / 0.08)",
    fontFamily: "'Montserrat', sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#3D2F0B",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    color: "#7C6A0A",
    marginBottom: 6,
    userSelect: "none",
  },
  input: {
    padding: "14px 18px",
    fontSize: 16,
    borderRadius: 12,
    border: "2px solid #F9C74F",
    outline: "none",
    transition: "border-color 0.3s",
    boxShadow: "inset 0 2px 6px rgb(0 0 0 / 0.06)",
    fontWeight: 500,
    color: "#3D2F0B",
  },
  footer: {
    textAlign: "right",
    marginBottom: 8,
  },
  registerLink: {
    fontSize: 14,
    color: "#F9C74F",
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
    userSelect: "none",
    transition: "color 0.25s ease",
  },
  button: {
    backgroundColor: "#F9C74F",
    border: "none",
    borderRadius: 30,
    padding: "14px",
    fontWeight: 700,
    fontSize: 18,
    color: "#3D2F0B",
    cursor: "pointer",
    boxShadow:
      "0 4px 12px rgb(249 199 79 / 0.6), inset 0 -2px 15px rgb(249 199 79 / 0.9)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  buttonLoading: {
    backgroundColor: "#D4AF37",
    border: "none",
    borderRadius: 30,
    padding: "14px",
    fontWeight: 700,
    fontSize: 18,
    color: "#f7f1de",
    cursor: "not-allowed",
    boxShadow:
      "0 4px 12px rgb(212 175 55 / 0.5), inset 0 -2px 15px rgb(212 175 55 / 0.7)",
    transition: "background-color 0.3s ease",
  },
  successMsg: {
    color: "#2a9d8f",
    fontWeight: 600,
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },
  errorMsg: {
    color: "#e63946",
    fontWeight: 600,
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },
};

export default LoginForm;