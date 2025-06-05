// src/app/admin/requests/RequestRestaurantForm.tsx
"use client";

import { useEffect, useState } from "react";

interface RestaurantRequest {
  id: number;
  name: string;
  address: string;
  phone: string;
  openTime: string;
  closeTime: string;
  restaurantStatus: boolean;
  requestDate: string;
}

export default function RequestRestaurantForm() {
  const [requests, setRequests] = useState<RestaurantRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/restaurant/restaurant_pending')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi lấy dữ liệu:', err);
        setLoading(false);
      });
  }, []);

  const approveRequest = async (id: number) => {
    const res = await fetch('/api/admin/restaurant/restaurant_approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      alert('Duyệt thành công');
      setRequests(prev => prev.filter(req => req.id !== id));
    } else {
      const err = await res.json();
      alert(`Lỗi: ${err.message}`);
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Yêu cầu tạo cửa hàng</h1>
      {requests.length === 0 ? (
        <p>Không có yêu cầu nào.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map(req => (
            <li key={req.id} className="border p-4 rounded">
              <p><strong>Tên:</strong> {req.name}</p>
              <p><strong>Địa chỉ:</strong> {req.address}</p>
              <p><strong>SĐT:</strong> {req.phone}</p>
              <p><strong>Giờ mở:</strong> {req.openTime}</p>
              <p><strong>Giờ đóng:</strong> {req.closeTime}</p>
              <p><strong>Ngày yêu cầu:</strong> {new Date(req.requestDate).toLocaleString()}</p>
              <button
                onClick={() => approveRequest(req.id)}
                className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
              >
                Duyệt
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
