"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormWrapper from "../components/UI/FormWrapper";
import Input from "../components/UI/Input";
import Button from "../components/UI/Button";

const RegisterForm = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");
  const router = useRouter();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, username, password, role }),
      });

      if (res.ok) {
        setMessage("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
        setFullName("");
        setUsername("");
        setPassword("");
        setRole("customer");
        setTimeout(() => {
          router.push("/Login");
        }, 1500);
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
    <FormWrapper title="Đăng ký tài khoản">
      <form onSubmit={handleSubmit} noValidate>
        <Input
          id="fullName"
          label="Họ và tên"
          type="text"
          placeholder="Nhập họ và tên"
          value={fullName}
          onChange={setFullName}
          disabled={loading}
        />

        <Input
          id="username"
          label="Tên đăng nhập"
          type="text"
          placeholder="Nhập tên đăng nhập"
          value={username}
          onChange={setUsername}
          disabled={loading}
        />

        <Input
          id="password"
          label="Mật khẩu"
          type="password"
          placeholder="Nhập mật khẩu"
          value={password}
          onChange={setPassword}
          disabled={loading}
        />

        <div style={{ marginBottom: 24 }}>
          <label
            htmlFor="role"
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 600,
              fontSize: 16,
              color: "#222",
              fontFamily: "Arial, sans-serif",
              userSelect: "none",
            }}
          >
            Vai trò
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
              boxSizing: "border-box",
              fontFamily: "Arial, sans-serif",
              color: "#222",
              backgroundColor: loading ? "#f8f8f8" : "#fff",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "border-color 0.25s ease",
            }}
            disabled={loading}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
          >
            <option value="customer">Khách hàng</option>
            <option value="vendor">Quản lý nhà hàng</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {message && (
          <p
            style={{
              marginTop: 16,
              textAlign: "center",
              color: message.includes("thành công") ? "green" : "red",
              fontWeight: 600,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {message}
          </p>
        )}

        <Button type="submit" loading={loading}>
          Đăng ký
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
          Bạn đã có tài khoản?{" "}
          <Link
            href="/Login"
            style={{
              color: "#FF6F91",
              fontWeight: 600,
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Đăng nhập ngay
          </Link>
        </p>
      </form>
    </FormWrapper>
  );
};

export default RegisterForm;