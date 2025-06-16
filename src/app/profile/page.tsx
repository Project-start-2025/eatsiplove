"use client";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useUser } from "../Context/UserContext";
import Button from "../components/UI/Button";
import FormWrapper from "../components/UI/FormWrapper";
import Input from "../components/UI/Input";
import AddressInput from "../components/Map/AddressInput";
import MyMapComponent from "../components/Map/Map";

interface User {
  fullname: string;
  username: string;
  role: string;
  createdAt: string | null;
}

const footerStyle = {
  marginTop: 40,
  textAlign: "center" as const,
  fontSize: 14,
  color: "#999",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};

const sectionStyle = {
  lineHeight: 1.6,
  fontSize: 18,
  padding: "20px 30px",
  backgroundColor: "#f9faff",
  borderRadius: 12,
  boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
};
const headingStyle = {
  color: "#4a90e2",
  marginBottom: 24,
  fontWeight: 700,
  fontSize: 28,
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
};
const paragraphStyle = {
  marginBottom: 30,
  color: "#555",
  fontSize: 16,
};
const cardsContainerStyle = {
  display: "flex",
  gap: 20,
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
};

export default function ProfilePage() {
  const { user, loading } = useUser();
  const currentUser = user as User | null;

  const [showMap, setShowMap] = useState(false);
  const openMapModal = () => setShowMap(true);
  const closeMapModal = () => setShowMap(false);

  const [registering, setRegistering] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [openTime, setOpenTime] = useState("08:00");
  const [closeTime, setCloseTime] = useState("22:00");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Modal.setAppElement(document.body); // an toàn hơn #__next
    }
  }, []);

  useEffect(() => {
    console.log("User tải về:", currentUser);
    console.log("createdAt của user:", currentUser?.createdAt);
  }, [currentUser]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: 20 }}>
        Đang tải thông tin người dùng...
      </p>
    );

  if (!currentUser)
    return (
      <p style={{ textAlign: "center", marginTop: 20, color: "#ff4d4f" }}>
        Bạn chưa đăng nhập. Vui lòng đăng nhập để xem thông tin cá nhân.
      </p>
    );

  const hasRequiredInfoForRegister =
    restaurantName.trim() !== "" &&
    address.trim() !== "" &&
    phone.trim() !== "" &&
    openTime.trim() !== "" &&
    closeTime.trim() !== "";

  const handleRegisterClick = () => {
    if (!currentUser) {
      alert("Bạn cần đăng nhập để đăng ký nhà hàng.");
      return;
    }
    setError(null);
    if (!showForm) {
      setShowForm(true);
      return;
    }
    if (!hasRequiredInfoForRegister) {
      setError("Vui lòng điền đầy đủ thông tin nhà hàng.");
      return;
    }

    registerRestaurant();
  };

  const registerRestaurant = async () => {
    if (!currentUser) return;

    setRegistering(true);
    setError(null);

    try {
      const res = await fetch("/api/restaurants/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: restaurantName.trim(),
          address: address.trim(),
          phone: phone.trim(),
          openTime,
          closeTime,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Đăng ký nhà hàng thất bại.");
      } else {
        alert("Đăng ký nhà hàng thành công!");
        setRestaurantName("");
        setAddress("");
        setPhone("");
        setShowForm(false);
      }
    } catch (err) {
      setError("Lỗi kết nối. Vui lòng thử lại.");
      console.error(err);
    } finally {
      setRegistering(false);
    }
  };

  const handleSelectPosition = (latLng: { lat: number; lng: number }) => {
    setAddress(`${latLng.lat.toFixed(6)}, ${latLng.lng.toFixed(6)}`);
    closeMapModal();
  };

  return (
    <>
      <section style={sectionStyle}>
        <h2 style={headingStyle}>
          👋 Chào mừng {currentUser.fullname || currentUser.username}!
        </h2>
        <p style={paragraphStyle}>
          Đây là trang hồ sơ của bạn. Bạn có thể cập nhật thông tin cá nhân,
          kiểm tra hoạt động và quản lý cài đặt.
        </p>
        <div style={cardsContainerStyle}>
          <ProfileCard
            title="Thông tin cá nhân"
            content={
              <>
                <p>
                  <strong>Họ và tên:</strong> {currentUser.fullname}
                </p>
                <p>
                  <strong>Tên đăng nhập:</strong> {currentUser.username}
                </p>
              </>
            }
          />
          <ProfileCard
            title="Chi tiết tài khoản"
            content={
              <>
                <p>
                  <strong>Vai trò:</strong> {currentUser.role}
                </p>
                <p>
                  <strong>Ngày tạo tài khoản:</strong>{" "}
                  {currentUser.createdAt
                    ? new Date(currentUser.createdAt).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )
                    : "Không xác định"}
                </p>
              </>
            }
          />
          <ProfileCard
            title="Bảo mật"
            content={<p>Bạn có thể đổi mật khẩu và bật xác thực 2 bước.</p>}
          />
        </div>
      </section>

      <footer style={footerStyle}>
        {!showForm && (
          <>
            Muốn bán hàng thì nhấn Button{" "}
            <Button onClick={handleRegisterClick} disabled={registering}>
              {registering ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </>
        )}

        {showForm && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <FormWrapper
              title="Nhập thông tin nhà hàng để đăng ký"
              style={{
                maxWidth: 420,
                padding: 24,
                backgroundColor: "#fff",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                borderRadius: 8,
                zIndex: 1010,
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegisterClick();
                }}
              >
                <label style={{ display: "block", marginBottom: 12 }}>
                  <Input
                    id="restaurantName"
                    label="Tên nhà hàng"
                    value={restaurantName}
                    onChange={(val) => setRestaurantName(val)}
                    required
                    style={{ marginTop: 12 }}
                    disabled={registering}
                  />
                  <AddressInput
                    id="address"
                    label="Địa chỉ"
                    value={address}
                    onChange={setAddress}
                    onIconClick={openMapModal}
                    disabled={registering}
                    style={{ marginTop: 12 }}
                  />
                  <Input
                    id="phone"
                    label="Số điện thoại"
                    value={phone}
                    onChange={(val) => setPhone(val)}
                    type="tel"
                    required
                    style={{ marginTop: 12 }}
                    disabled={registering}
                  />
                  <Input
                    id="openTime"
                    label="Giờ mở cửa"
                    type="time"
                    value={openTime}
                    onChange={(val) => setOpenTime(val)}
                    required
                    disabled={registering}
                    style={{ marginTop: 12 }}
                  />

                  <Input
                    id="closeTime"
                    label="Giờ đóng cửa"
                    type="time"
                    value={closeTime}
                    onChange={(val) => setCloseTime(val)}
                    required
                    disabled={registering}
                    style={{ marginTop: 12 }}
                  />
                </label>

                {error && (
                  <p style={{ color: "red", marginBottom: 12 }}>{error}</p>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <Button type="submit" disabled={registering}>
                    {registering ? "Đang gửi..." : "Gửi đăng ký"}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setError(null);
                    }}
                    style={{ backgroundColor: "#999" }}
                    disabled={registering}
                  >
                    Hủy
                  </Button>
                </div>
              </form>
            </FormWrapper>
          </div>
        )}
      </footer>

      <Modal
        isOpen={showMap}
        onRequestClose={closeMapModal}
        contentLabel="Chọn vị trí trên bản đồ"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1100,
          },
          content: {
            maxWidth: "600px",
            margin: "auto",
            inset: "40px",
            borderRadius: 8,
            padding: 20,
            zIndex: 1110,
          },
        }}
      >
        <h2>Chọn vị trí trên bản đồ</h2>
        {/* Hiển thị bản đồ thật của bạn ở đây, nhớ truyền callback chọn vị trí */}
        <MyMapComponent
  onSelectPosition={(latLng) => {
    handleSelectPosition(latLng);
    closeMapModal();
  }}
/>

        <div style={{ textAlign: "right" }}>
          <Button onClick={closeMapModal} style={{ backgroundColor: "#999" }}>
            Hủy
          </Button>
        </div>
      </Modal>
    </>
  );
}

function ProfileCard({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) {
  const [hover, setHover] = React.useState(false);

  const cardStyle: React.CSSProperties = {
    flex: "1 1 220px",
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: hover
      ? "0 8px 24px rgb(0 0 0 / 0.14)"
      : "0 4px 12px rgb(0 0 0 / 0.08)",
    padding: 24,
    cursor: "pointer",
    transition: "box-shadow 0.3s ease",
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: 16,
          color: "#333",
          fontWeight: 600,
          fontSize: 20,
        }}
      >
        {title}
      </h3>
      <div style={{ color: "#666", fontSize: 15 }}>{content}</div>
    </div>
  );
}