import AddProductForm from "./AddProductForm";

export default function AddProductsPage() {
  return (
<main className="min-h-screen bg-gradient-to-br from-[#99FFFF] to-[#0066CC] py-12 px-[5px] sm:px-12 flex justify-center items-center">
<section className="w-full min-w-[640px] max-w-6xl bg-[#99FFFF]/90 rounded-3xl border-4 border-[#0066CC] shadow-2xl px-12 py-16 flex flex-col items-center">
        <h1 className="mb-8 text-3xl font-extrabold text-[#0066CC] drop-shadow-lg border-b-2 border-[#0066CC] w-full pb-4 text-center">
          🛒 Thêm sản phẩm mới
        </h1>
        <AddProductForm />
      </section>
    </main>
  );
}
