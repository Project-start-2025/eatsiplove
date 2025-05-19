"use client";

import { useState } from "react";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Call API to submit
    console.log({ name, desc, price, imageUrl });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded-2xl p-10 shadow-lg space-y-8"
    >
      <div>
        <label
          htmlFor="name"
          className="block mb-3 font-semibold text-gray-900"
        >
          Tên sản phẩm
        </label>
        <input
          id="name"
          type="text"
          required
          className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm 
          focus:border-yellow-400 focus:ring-4 focus:ring-yellow-300 transition duration-200 outline-none"
          placeholder="Nhập tên món ăn"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="desc"
          className="block mb-3 font-semibold text-gray-900"
        >
          Mô tả
        </label>
        <textarea
          id="desc"
          required
          rows={5}
          className="w-full resize-none rounded-lg border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm
          focus:border-yellow-400 focus:ring-4 focus:ring-yellow-300 transition duration-200 outline-none"
          placeholder="Mô tả ngắn về món ăn"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block mb-3 font-semibold text-gray-900"
        >
          Giá (VND)
        </label>
        <input
          id="price"
          type="number"
          min={0}
          required
          className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm 
          focus:border-yellow-400 focus:ring-4 focus:ring-yellow-300 transition duration-200 outline-none"
          placeholder="Nhập giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label
          htmlFor="imageUrl"
          className="block mb-3 font-semibold text-gray-900"
        >
          URL hình ảnh
        </label>
        <input
          id="imageUrl"
          type="url"
          required
          className="w-full rounded-lg border border-gray-300 px-5 py-3 text-gray-900 placeholder-gray-400 shadow-sm 
          focus:border-yellow-400 focus:ring-4 focus:ring-yellow-300 transition duration-200 outline-none"
          placeholder="https://..."
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-yellow-400 px-6 py-4 font-semibold text-gray-900 
        shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition"
      >
        ➕ Thêm sản phẩm
      </button>
    </form>
  );
}