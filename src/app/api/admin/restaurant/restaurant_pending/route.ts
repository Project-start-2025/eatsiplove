// src/app/api/admin/restaurant_pending/route.ts
"use server";

import { NextResponse } from 'next/server';
import sql from 'mssql';
import { MapDbRecordSet } from '@/app/api/components/MapDbRecord';

const config: sql.config = {
  user: process.env.DB_USER!,
  password: process.env.DB_PASS!,
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

export async function GET() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * FROM RestaurantRequests ORDER BY RequestDate DESC');
    
    // ✅ Ánh xạ toàn bộ recordset sang định dạng chữ thường
    const mapped = MapDbRecordSet(result.recordset);

    return NextResponse.json(mapped, { status: 200 });
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return NextResponse.json({ message: 'Lỗi server' }, { status: 500 });
  }
}
