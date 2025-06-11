"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FormWrapper from "../components/UI/FormWrapper";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";
import Link from "next/link";
import { useUser } from "../Context/UserContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include", // để cookie HttpOnly được gửi tự động
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Giả sử data = { user: { ... } }
        setUser(data.user);
        router.push("/profile");
      } else {
        const err = await res.json();
        setError(err.message || "Đăng nhập thất bại");
      }
    } catch {
      setError("Lỗi mạng, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper title="Đăng nhập">
      <form onSubmit={handleSubmit}>
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={setEmail}
          disabled={loading}
          autoComplete="email"
        />
        <Input
          id="password"
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={setPassword}
          disabled={loading}
          autoComplete="current-password"
        />

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.includes("thành công") ? "green" : "red",
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            {message}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Đăng nhập
        </Button>
        <p
          style={{
            marginTop: 20,
            fontSize: 14,
            color: "#666",
            textAlign: "center",
            fontFamily: "Arial, sans-serif",
          }}
        >
          Bạn chưa có tài khoản?{" "}
          <Link
            href="/Register"
            style={{
              color: "#FF6F91",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Đăng ký ngay
          </Link>
        </p>
      </form>
    </FormWrapper>
  );
}
