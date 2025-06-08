"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Restaurant } from '@/models/Restaurant';

export default function ListRestaurantForm(){
    const [restaurant, setRestaurant] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect
    return(
        <div>
             <h1 className="text-2xl font-bold mb-6">Danh sách cửa hàng</h1>

        </div>
    );
}