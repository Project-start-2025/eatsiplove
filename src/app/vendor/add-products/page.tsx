// src/app/vendor/add-products/page.tsx

import AddProductForm from "./AddProductForm";

export default function AddProductsPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 flex justify-center items-start">
      <section className="w-full max-w-3xl rounded-3xl bg-white p-12 shadow-lg">
        <h1 className="mb-8 text-3xl font-extrabold text-gray-900">
          🛒 Thêm sản phẩm mới
        </h1>
        <AddProductForm />
      </section>
    </main>
  );
}