import AddFoodClientWrapper from "@/app/components/Food/AddFoodClientWrapper";


export default function AddFoodPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#99ffff] to-[#0066cc] py-12 px-5 sm:px-12 flex justify-center items-center">
      <section className="w-full min-w-[640px] max-w-5xl bg-[#99ffffcc] rounded-3xl border-4 border-[#0066cc] shadow-2xl px-12 py-16 flex flex-col items-center">
        <h1 className="mb-10 text-3xl font-extrabold text-[#0066cc] drop-shadow-lg border-b-2 border-[#0066cc] w-full pb-5 text-center">
          🛒 Thêm sản phẩm mới
        </h1>
        <AddFoodClientWrapper />
      </section>
    </main>
  );
}