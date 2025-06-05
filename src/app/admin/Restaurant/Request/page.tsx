// src/app/vendor/add-products/page.tsx

import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RequestRestaurantForm from './RequestRestaurantForm';

export default function RequestRestaurantPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-6 sm:px-12 lg:px-24 flex justify-center items-start">       
        <RequestRestaurantForm/>      
    </main>
  );
}