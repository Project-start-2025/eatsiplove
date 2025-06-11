"use client";

import React from "react";

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  id: string;
  label: string;
  onChange?: (value: string) => void;
};

export default function Input({
  id,
  label,
  onChange,
  type = "text",
  value,
  disabled = false,
  placeholder,
  style,
  ...rest
}: InputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <label
        htmlFor={id}
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
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 4,
          border: "1px solid #ccc",
          boxSizing: "border-box",
          fontSize: 16,
          fontFamily: "Arial, sans-serif",
          color: disabled ? "#999" : "#222",
          backgroundColor: disabled ? "#f8f8f8" : "#fff",
          transition: "border-color 0.25s ease",
          ...style,
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = "#4a90e2")}
        onBlur={(e) => (e.currentTarget.style.borderColor = "#ccc")}
        {...rest} // những props còn lại như required, autoComplete, name... sẽ được truyền xuống đây
      />
    </div>
  );
}