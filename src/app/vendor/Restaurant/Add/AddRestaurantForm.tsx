"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddRestaurantForm(){
    const [formData, setFormData] = useState({
        //idOwner: 1, // Giả định user đang đăng nhập có id = 1
        name: '',
        address: '',
        phone: '',
        openTime: '',
        closeTime: '',
        restaurantStatus: true,
    });

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/admin/restaurant/restaurant_req', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        });

        if (res.ok) {
        alert('Tạo cửa hàng thành công!');
        router.push('/');
        } else {
        const error = await res.json();
        alert(`Lỗi: ${error.message}`);
        }
    };
    
    return (
        <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
            <h2 className="text-xl font-bold mb-4">Tạo mới cửa hàng</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input name="name" placeholder="Tên cửa hàng" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="address" placeholder="Địa chỉ" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="phone" placeholder="Số điện thoại" onChange={handleChange} required className="w-full p-2 border rounded" />
                <input name="openTime" placeholder="Giờ mở cửa (hh:mm)" onChange={handleChange} required className="w-full p-2 border rounded" /*type="time"*/ />
                <input name="closeTime" placeholder="Giờ đóng cửa (hh:mm)" onChange={handleChange} required className="w-full p-2 border rounded" /*type="time"*//>
                <label className="flex items-center gap-2">
                <input type="checkbox" name="restaurantStatus" checked={formData.restaurantStatus} onChange={handleChange} />
                Đang hoạt động
                </label>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Tạo cửa hàng</button>
            </form>
        </div>
    );
};