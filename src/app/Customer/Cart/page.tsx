import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartForm from './CartForm';
export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 flex justify-center items-start">       
      <CartForm/>      
    </main>
  );
}