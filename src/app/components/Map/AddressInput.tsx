import React from "react";
import Input from "../UI/Input"; // nhập Input gốc của bạn
import { FiMapPin } from "react-icons/fi";

interface AddressInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  onIconClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export default function AddressInput({
  id,
  label,
  value,
  onChange,
  onIconClick,
  disabled = false,
}: AddressInputProps) {
  return (
    <div style={{ position: "relative", marginBottom: 20 }}>
      {/* Input gốc của bạn */}
      <Input
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{ paddingRight: 36 }} // thêm padding phải để đủ chỗ cho icon
      />
      {/* Icon bản đồ đặt chồng lên input */}
      <FiMapPin
        onClick={onIconClick}
        size={20}
        style={{
          position: "absolute",
          right: 10,
          top: 38,
          transform: "none",

          cursor: disabled ? "default" : "pointer",
          color: disabled ? "#ccc" : "#4a90e2",
          userSelect: "none",
        }}
        title="Chọn địa chỉ trên bản đồ"
      />
    </div>
  );
}
