"use client";

import { useState } from "react";

type FormData = {
  name: string;
  address: string;
  description: string;
};

export default function RequestRestaurantForm() {
  const [form, setForm] = useState<FormData>({
    name: "",
    address: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Simple validation
    if (!form.name.trim() || !form.address.trim()) {
      setMessage("Tên và địa chỉ nhà hàng là bắt buộc");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/admin/restaurants/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Đã xảy ra lỗi khi gửi yêu cầu");
      } else {
        setMessage("Gửi yêu cầu thành công, chờ admin duyệt nhé!");
        setForm({ name: "", address: "", description: "" }); // reset form
      }
    } catch {
      setMessage("Lỗi kết nối tới máy chủ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          Tên nhà hàng
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded p-2"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block font-semibold mb-1">
          Địa chỉ
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded p-2"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block font-semibold mb-1">
          Mô tả (tùy chọn)
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          rows={4}
          disabled={loading}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Đang gửi..." : "Gửi yêu cầu"}
      </button>

      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}