"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "@/styles/styles.LoginForm";
import { useUser } from "../Context/UserContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUser();

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
        const data = await res.json();  
        // Giả sử data.user gồm { username, fullname, role }
        setUser(data.user);
        setMessage("Đăng nhập đúng, chào mừng!");
        router.push("/vendor/add-products");
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

      <button
        type="submit"
        style={loading ? styles.buttonLoading : styles.button}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đăng nhập"}
      </button>

      {message && (
        <p
          style={
            message.includes("đăng nhập đúng")
              ? styles.successMsg
              : styles.errorMsg
          }
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default LoginForm;