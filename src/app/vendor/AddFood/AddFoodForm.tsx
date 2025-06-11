"use client";
import React, { useState, useRef } from "react";
import { useUser } from "@/app/Context/UserContext";

async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Lỗi upload ảnh!");
  return await res.json();
}

export default function AddFoodForm() {
  const { user } = useUser();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_SIZE_MB = 5;

  const handlePriceChange = (val: string) => {
    if (/^\d*\.?\d*$/.test(val)) setPrice(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) {
      alert("Bạn cần đăng nhập để thêm sản phẩm!");
      return;
    }
    if (!name || !desc || !price || !imageFiles.length) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setIsLoading(true);
    try {
      const images: { url: string; public_id: string }[] = [];

      for (const file of imageFiles) {
        const uploaded = await uploadImage(file);
        images.push(uploaded);
      }

      const res = await fetch("/api/Food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description: desc,
          price: Number(price),
          images,
          userId: user.id,
        }),
      });

      const data = await res.json();
      setIsLoading(false);
      if (!res.ok) throw new Error(data.error || "Có lỗi xảy ra!");

      alert("Thêm sản phẩm thành công!");

      setName("");
      setDesc("");
      setPrice("");
      setImageFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      setIsLoading(false);
      alert("Lỗi: " + err.message);
    }
  };

  return (
    <section
    style={{
      width: "100%",
      maxWidth: 640,
      margin: '0 auto',
      padding: '36px 0',   // <--- Kiểm soát padding ngang ở section!
      background: '#fcfeff',
      borderRadius: 16,
      boxShadow: '0 6px 24px rgba(66,140,245,0.11)',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: "#282f37",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}
  >
      <h2
        style={{
          fontSize: 22,
          color: "#3869cb", // xanh đậm vừa phải, ít bão hòa hơn
          marginBottom: 6,
          fontWeight: 700,
          letterSpacing: 0.8,
          lineHeight: 1.2,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        🛒 Thêm sản phẩm mới
      </h2>
      <p
        style={{
          color: "#5a6b8c",
          marginBottom: 30,
          fontSize: 16,
          fontWeight: 400,
        }}
      >
        Hãy nhập thông tin chi tiết cho sản phẩm của bạn.
      </p>
      <form onSubmit={handleSubmit} autoComplete="off"
       style={{
        width: "96%",
        maxWidth: 420, // <--- Form vào trong KHUNG HẸP hơn Section!
        display: "flex",
        flexDirection: "column"
      }}
    >
        <FormField label="Tên sản phẩm" required>
          <Input
            type="text"
            placeholder="Nhập tên món ăn"
            value={name}
            onChange={setName}
            required
          />
        </FormField>
        <FormField label="Mô tả" required>
          <Textarea
            placeholder="Mô tả ngắn về món ăn"
            value={desc}
            onChange={setDesc}
            required
          />
        </FormField>
        <FormField label="Giá (VND)" required>
          <Input
            type="number"
            placeholder="Ví dụ: 65000"
            value={price}
            onChange={handlePriceChange}
            min={0}
            required
          />
        </FormField>
        <FormField label={`Ảnh sản phẩm (≤ ${MAX_SIZE_MB}MB/ảnh)`} required>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            required={imageFiles.length === 0}
            style={inputStyle}
            onChange={(e) => {
              const files = e.target.files ? Array.from(e.target.files) : [];
              const filtered = files.filter(
                (f) => f.size / 1024 / 1024 <= MAX_SIZE_MB
              );
              if (filtered.length < files.length) {
                alert(`Chỉ upload ảnh nhỏ hơn ${MAX_SIZE_MB}MB!`);
              }
              setImageFiles(filtered);
            }}
          />
          {imageFiles.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 11,
                flexWrap: "wrap",
              }}
            >
              {imageFiles.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  alt={`Ảnh xem trước ${i + 1}`}
                  style={{
                    width: 72,
                    height: 72,
                    objectFit: "cover",
                    borderRadius: 8,
                    border: "1.5px solid #e3e7ef",
                    boxShadow: "0 1px 4px rgba(50,122,213,.10)",
                    background: "#fff",
                  }}
                />
              ))}
            </div>
          )}
        </FormField>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            width: "100%",
            padding: "13px 0",
            backgroundColor: isLoading ? "#8ec1f8" : "#3378d1",
            color: "#fff",
            fontWeight: 600,
            border: "none",
            borderRadius: 8,
            fontSize: 17,
            marginTop: 23,
            cursor: isLoading ? "not-allowed" : "pointer",
            boxShadow: "0 2px 8px rgba(67,137,226,.11)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 7,
            transition: "background 0.18s",
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = "#275ea3")}
          onMouseOut={(e) =>
            (e.currentTarget.style.background = isLoading
              ? "#8ec1f8"
              : "#3378d1")
          }
        >
          {isLoading && (
            <svg
              style={{ marginRight: 7 }}
              className="animate-spin"
              width={22}
              height={22}
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v3.5l3-3.5-3-3.5V4A8 8 0 104 12z"
              />
            </svg>
          )}
          {isLoading ? "Đang thêm..." : "Thêm sản phẩm"}
        </button>
      </form>
    </section>
  );
}

function FormField({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div style={{ marginBottom: 23 }}>
      <label
        style={{
          fontWeight: 600,
          color: "#4a90e2",
          display: "block",
          marginBottom: 9,
          fontSize: 16,
        }}
      >
        {label}
        {required && <span style={{ color: "tomato", marginLeft: 6 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  fontSize: 16,
  padding: "11px 15px",
  borderRadius: 7,
  border: "1.6px solid #b3cef6",
  outline: "none",
  boxShadow: "0 1px 4px rgba(74,144,226,0.10)",
  marginBottom: 0,
  color: "#333",
  background: "#fff",
  transition: "border-color 0.2s,box-shadow 0.2s",
};

function Input({
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  min,
}: {
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  min?: number;
}) {
  return (
    <input
      type={type}
      value={value}
      min={min}
      required={required}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={inputStyle}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#b3cef6")}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <textarea
      value={value}
      required={required}
      rows={4}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      style={{
        ...inputStyle,
        resize: "none",
        minHeight: 90,
        fontSize: 16,
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "#b3cef6")}
    />
  );
}
