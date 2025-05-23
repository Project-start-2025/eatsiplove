// src/app/vendor/add-products/page.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListRestaurantForm from './ListRestaurantForm';
export default function AddRestaurantPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 flex justify-center items-start">       
        <ListRestaurantForm />      
    </main>
  );
}