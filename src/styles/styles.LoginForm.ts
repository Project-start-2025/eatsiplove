import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
  form: {
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    padding: "40px 44px",
    borderRadius: 20,
    backgroundColor: "#ffffff", // trắng sáng
    boxShadow: "0 16px 32px rgb(0 0 0 / 0.1), 0 4px 16px rgb(0 0 0 / 0.06)",
    fontFamily: "'Montserrat', sans-serif",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    color: "#264653", // xanh đậm nhẹ nhàng
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  label: {
    fontWeight: 600,
    fontSize: 15,
    color: "#2a9d8f", // xanh biển nhạt
    marginBottom: 6,
    userSelect: "none",
  },
  input: {
    padding: "14px 18px",
    fontSize: 16,
    borderRadius: 12,
    border: "2px solid #e9c46a", // vàng nhẹ nhàng dễ chịu
    outline: "none",
    transition: "border-color 0.3s, box-shadow 0.3s",
    boxShadow: "inset 0 2px 6px rgb(0 0 0 / 0.06)",
    fontWeight: 500,
    color: "#264653",
  },
  inputFocus: {
    borderColor: "#f4a261", // cam tươi khi focus (cần xử lý qua class hoặc sự kiện)
    boxShadow: "0 0 8px 2px rgba(244,162,97,0.4)",
  },
  footer: {
    textAlign: "right",
    marginBottom: 8,
  },
  registerLink: {
    fontSize: 14,
    color: "#f4a261", // cam ấm áp
    fontWeight: 600,
    textDecoration: "underline",
    cursor: "pointer",
    userSelect: "none",
    transition: "color 0.3s ease",
  },
  button: {
    backgroundColor: "#e76f51", // đỏ cam tươi và nổi bật
    border: "none",
    borderRadius: 30,
    padding: "14px",
    fontWeight: 700,
    fontSize: 18,
    color: "#fefae0", // trắng vàng nhẹ
    cursor: "pointer",
    boxShadow:
      "0 4px 12px rgba(231, 111, 81, 0.6), inset 0 -2px 15px rgba(231, 111, 81, 0.9)",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  },
  buttonLoading: {
    backgroundColor: "#a14f3a", // đỏ nâu đậm hơn khi loading
    border: "none",
    borderRadius: 30,
    padding: "14px",
    fontWeight: 700,
    fontSize: 18,
    color: "#fefae0",
    cursor: "not-allowed",
    boxShadow:
      "0 4px 12px rgba(161, 79, 58, 0.5), inset 0 -2px 15px rgba(161, 79, 58, 0.7)",
    transition: "background-color 0.3s ease",
  },
  successMsg: {
    color: "#2a9d8f", // xanh biển đậm
    fontWeight: 600,
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },
  errorMsg: {
    color: "#d62828", // đỏ tươi rõ ràng
    fontWeight: 700,
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
  },
};

export default styles;