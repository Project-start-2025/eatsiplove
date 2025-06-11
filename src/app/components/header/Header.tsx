"use client";
import { useUser } from "@/app/Context/UserContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaSearch, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
const Header = () => {
  const [ShowDropDown, setShowDropDown] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useUser();
  const router = useRouter();
  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowDropDown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <header
      style={{
        backgroundColor: "#1c1c1c",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 30px",
      }}
    >
      <nav style={{ display: "flex", gap: "20px", fontWeight: "600" }}>
        <Link href="/" style={{ color: "#F9C74F" }}>
          Trang chủ
        </Link>
        <div style={{ position: "relative" }}>
          <Link href="/Food" style={{ color: "white" }}>
            Sản phẩm ▼
          </Link>
        </div>
        <Link href="/tin-tuc" style={{ color: "white" }}>
          Tin tức
        </Link>
        <Link href="/lien-he" style={{ color: "white" }}>
          Liên hệ
        </Link>
        <Link href="/gioi-thieu" style={{ color: "white" }}>
          Giới thiệu
        </Link>
        <Link href="/" style={{ color: "white" }}>
          Thêm sản phẩm
        </Link>
      </nav>

      <div style={{ flexGrow: 1, textAlign: "center" }}>
        <img
          src="/logo_eatsiplove.png"
          alt="Honey Bee Farm"
          style={{ height: 40, cursor: "pointer" }}
        />
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontWeight: "600",
        }}
      >
        <span>
          HOTLINE: <span style={{ color: "#F9C74F" }}>1800 6750</span>
        </span>

        <div
          ref={userRef}
          style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setShowDropDown(!ShowDropDown)}
        >
          <FaUser />
          {ShowDropDown && (
            <div
              style={{
                position: "absolute",
                top: "120%",
                right: 0,
                backgroundColor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: "6px",
                width: "150px",
                zIndex: 100,
                padding: "10px",
                color: "#333",
              }}
            >
              {!user ? (
                <>
                  <Link
                    href="/Login"
                    style={{
                      display: "block",
                      padding: "8px 0",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#333",
                      textDecoration: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowDropDown(false)}
                  >
                    Đăng nhập
                  </Link>
                  <hr style={{ margin: "0" }} />
                  <Link
                    href="/Register"
                    style={{
                      display: "block",
                      padding: "8px 0",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#333",
                      textDecoration: "none",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowDropDown(false)}
                  >
                    Đăng ký
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/profile"
                    style={{
                      display: "block",
                      padding: "6px 0",
                      fontWeight: "600",
                      fontSize: "14px",
                      color: "#333",
                      textDecoration: "none",
                      textAlign: "center", // sửa từ 'left' sang 'center'
                      cursor: "pointer",
                    }}
                    onClick={() => setShowDropDown(false)}
                  >
                    Thông tin cá nhân
                  </Link>
                  <button
                    onClick={async () => {
                      await logout();
                      setShowDropDown(false);
                      router.push("/");
                    }}
                    style={{
                      marginTop: "8px",
                      width: "100%",
                      border: "none",
                      backgroundColor: "#e63946",
                      color: "white",
                      fontWeight: "600",
                      padding: "8px 0",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                  >
                    Đăng xuất
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <FaSearch style={{ cursor: "pointer" }} />
        <div style={{ position: "relative", cursor: "pointer" }}>
          <FaShoppingCart />
          <span
            style={{
              position: "absolute",
              top: "-6px",
              right: "-8px",
              background: "#F9C74F",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px",
              fontWeight: "700",
              color: "#1c1c1c",
            }}
          >
            0
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
