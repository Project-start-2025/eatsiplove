import Image from "next/image";

interface Food {
  id: number | string;
  name: string;
  description: string;
  price: number;
  images: { url: string; public_id: string }[];
}

interface FoodCardProps {
  food: Food;
}

export default function FoodCard({ food }: FoodCardProps) {
  const firstImageUrl = food.images && food.images.length > 0 ? food.images[0].url : "";

  return (
    <div className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="relative w-full h-48 mb-4 rounded overflow-hidden">
        {firstImageUrl ? (
          <Image
            src={firstImageUrl}
            alt={food.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-500">
            Chưa có ảnh
          </div>
        )}
      </div>
      <h3 className="text-lg font-semibold mb-1">{food.name}</h3>
      <p className="text-sm text-gray-600 flex-grow">{food.description}</p>
      <p className="mt-2 font-bold text-primary">{food.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
    </div>
  );
}