import FoodCard from "./FoodCard";

interface Food {
  id: number;  // hoặc string, theo DB bạn
  name: string;
  description: string;
  price: number;
  images: { url: string; public_id: string }[];
}

interface FoodListProps {
  foods: Food[] | undefined;
}

export default function FoodList({ foods }: FoodListProps) {
  if (!foods || foods.length === 0)
    return <p className="text-center py-10 text-gray-500">Chưa có món ăn nào.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 max-w-6xl mx-auto py-8">
      {foods.map((food) => (
        <FoodCard key={food.id} food={food} />
      ))}
    </div>
  );
}