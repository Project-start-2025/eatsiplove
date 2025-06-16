"use client";
import { useEffect, useState } from "react";
import FoodList from "./components/Food/FoodList";
import { Food } from "@/models/BE/Food";
export default function Home() {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/Food")
      .then((res) => res.json())
      .then((data) => {
        setFoods(data.foods);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main>
      <h1>Danh sách món ăn</h1>
      {/* <FoodList foods={foods} /> */}
    </main>
  );
}
