"use client";

import Button from "@/app/components/UI/Button";
import FormWrapper from "@/app/components/UI/FormWrapper";
import { useUser } from "@/app/Context/UserContext";
import React, { useState, useEffect } from "react";


type RestaurantRequest = {
  id: number;
  name: string;
  address: string;
  phone?: string;
  openTime?: string;
  closeTime?: string;
  description?: string;
  status: "pending" | "approved" | "rejected";
};

export default function RequestRestaurantList() {
  const { user, loading: userLoading } = useUser(); // <-- lấy user và trạng thái loading user
  const [requests, setRequests] = useState<RestaurantRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const ADMIN_ROLE = "admin";

  
  async function fetchRequests() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/restaurants/pending");
      if (!res.ok) throw new Error("Lấy danh sách thất bại");
      const data: RestaurantRequest[] = await res.json();
      setRequests(data);
    } catch (err) {
      setMessage((err as Error).message || "Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  async function handleAction(id: number, approve: boolean) {
    setProcessingId(id);
    setMessage(null);
    try {
      const action = approve ? "approve" : "reject";
      const res = await fetch(`/api/admin/restaurants/${id}/${action}`, {
        method: "PUT",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Lỗi khi xử lý");
      setMessage(`Nhà hàng đã ${approve ? "được duyệt" : "bị từ chối"}`);
      await fetchRequests();
    } catch (err) {
      setMessage((err as Error).message || "Lỗi khi xử lý");
    } finally {
      setProcessingId(null);
    }
  }

  if (loading)
    return (
      <FormWrapper title="Danh sách nhà hàng chờ duyệt">
        <p>Đang tải danh sách nhà hàng chờ duyệt...</p>
      </FormWrapper>
    );

    if (!userLoading && user?.role !== ADMIN_ROLE) {
      return (
        <FormWrapper title="Danh sách nhà hàng chờ duyệt">
          <p>Bạn không có quyền xem trang này.</p>
        </FormWrapper>
      );
    }

  return (
    <FormWrapper title="Danh sách nhà hàng chờ duyệt">
      {message && (
        <p
          style={{
            marginBottom: 20,
            color: message.toLowerCase().includes("lỗi") ? "red" : "green",
            fontWeight: "bold",
            fontFamily: "Arial, sans-serif",
          }}
        >
          {message}
        </p>
      )}

      {requests.length === 0 && <p>Không có nhà hàng nào đang chờ duyệt.</p>}

      {requests.map((r) => (
        <div
          key={r.id}
          style={{
            padding: 12,
            marginBottom: 12,
            border: "1px solid #ddd",
            borderRadius: 6,
            fontFamily: "Arial, sans-serif",
          }}
        >
          <p>
            <strong>{r.name}</strong>
          </p>
          <p>Địa chỉ: {r.address}</p>
          {r.phone && <p>Điện thoại: {r.phone}</p>}
          <p>
            Thời gian mở cửa: {r.openTime ?? "Chưa có"} - Đóng cửa:{" "}
            {r.closeTime ?? "Chưa có"}
          </p>
          {r.description && (
            <p style={{ fontStyle: "italic", marginTop: 8 }}>{r.description}</p>
          )}

          {/* Hiển thị nút duyệt chỉ khi user đã load xong và role là admin */}
          {user?.role === "admin" ? (
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 12,
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={() => handleAction(r.id, true)}
                disabled={processingId === r.id}
                loading={processingId === r.id}
              >
                Duyệt
              </Button>
              <Button
                onClick={() => handleAction(r.id, false)}
                disabled={processingId === r.id}
                loading={processingId === r.id}
              >
                Không duyệt
              </Button>
            </div>
          ) : (
            <p style={{ marginTop: 12, fontStyle: "italic", color: "#777" }}>
              Bạn không có quyền duyệt nhà hàng.
            </p>
          )}
        </div>
      ))}
    </FormWrapper>
  );
}