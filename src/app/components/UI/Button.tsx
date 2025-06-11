"use client";

import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  style?: React.CSSProperties;  
};
export default function Button({

  children,
  disabled = false,
  loading = false,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      style={{
        width: "100%",
        backgroundColor: disabled || loading ? "#85a8dc" : "#4a90e2",
        color: "#fff",
        fontWeight: "bold",
        padding: "12px 0",
        border: "none",
        borderRadius: 6,
        cursor: disabled || loading ? "not-allowed" : "pointer",
        fontSize: 16,
        fontFamily: "Arial, sans-serif",
        transition: "background-color 0.3s ease",
        userSelect: "none",
      }}
    >
      {loading ? "Đang xử lý..." : children}
    </button>
  );
}