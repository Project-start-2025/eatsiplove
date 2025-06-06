"use client";
import { useState } from "react";

export default function AddProductForm() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFiles.length) return alert("Chưa chọn ảnh!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    // Nên dùng cùng 1 key: image[] để backend nhận mảng file
    imageFiles.forEach((file, idx) => {
      formData.append("images", file);
    });

    // Gửi formData lên API ở đây (fetch/post)
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl px-[15px] mx-auto space-y-7 flex flex-col"
      autoComplete="off"
    >
      <div className="flex flex-col items-start w-full">
        <label htmlFor="name" className="mb-2 font-bold text-[#0066CC]">
          Tên sản phẩm
        </label>
        <input
          id="name"
          type="text"
          required
          className="rounded-xl border-2 border-[#0066CC] px-4 py-3 text-black bg-white/80
            focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20
            placeholder-black/50 transition duration-150 shadow w-full"
          placeholder="Nhập tên món ăn"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-start w-full">
        <label htmlFor="desc" className="mb-2 font-bold text-[#0066CC]">
          Mô tả
        </label>
        <textarea
          id="desc"
          required
          rows={4}
          className="rounded-xl border-2 border-[#0066CC] px-4 py-3 text-black bg-white/80
            focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20
            placeholder-black/50 transition duration-150 shadow w-full"
          placeholder="Mô tả ngắn về món ăn"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-start w-full">
        <label htmlFor="price" className="mb-2 font-bold text-[#0066CC]">
          Giá (VND)
        </label>
        <input
          id="price"
          type="number"
          min={0}
          required
          className="rounded-xl border-2 border-[#0066CC] px-4 py-3 text-black bg-white/80
            focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20
            placeholder-black/50 transition duration-150 shadow w-full"
          placeholder="Nhập giá"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
      </div>

      <div className="flex flex-col items-start w-full">
        <label htmlFor="imageFile" className="mb-2 font-bold text-[#0066CC]">
          Ảnh sản phẩm
        </label>
        <input
          id="imageFile"
          type="file"
          accept="image/*"
          multiple
          required
          className="rounded-xl border-2 border-[#0066CC] px-4 py-3 bg-white/80 focus:border-[#0066CC] focus:ring-2 focus:ring-[#0066CC]/20 transition duration-150 shadow w-full"
          onChange={e => {
            const files = e.target.files;
            if (files && files.length > 0) {
              setImageFiles(Array.from(files));
            } else {
              setImageFiles([]);
            }
          }}
        />
        {imageFiles.length > 0 && (
          <div className="flex gap-4 flex-wrap mt-2">
            {imageFiles.map((file, i) => (
              <img
                key={i}
                src={URL.createObjectURL(file)}
                alt="Xem trước ảnh"
                className="max-w-[128px] max-h-[128px] rounded object-cover border border-gray-200 shadow"
              />
            ))}
          </div>
        )}
      </div>

      <div className="w-full">
        <button
          type="submit"
          className="w-full py-3 bg-[#0066CC] text-white font-semibold rounded-xl shadow-md hover:bg-[#0055aa] transition-all duration-300"
        >
          Thêm sản phẩm
        </button>
      </div>
    </form>
  );
}