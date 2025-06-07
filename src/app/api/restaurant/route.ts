import { NextRequest, NextResponse } from 'next/server';
import sql from 'mssql';
import { Restaurant } from '@/models/Restaurant';

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

export async function POST(req: NextRequest) {
  try {
    const body: Restaurant = await req.json();

    const {name, address, phone, openTime, closeTime, restaurantStatus } = body;

    if (!name || !address || !phone || !openTime || !closeTime) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const pool = await sql.connect(config);

    await pool.request()
      //.input('idOwner', sql.Int, idOwner)
      .input('name', sql.NVarChar, name)
      .input('address', sql.NVarChar, address)
      .input('phone', sql.NVarChar, phone)
      .input('openTime', sql.Time, openTime)
      .input('closeTime', sql.Time, closeTime)
      .input('restaurantStatus', sql.Bit, restaurantStatus)
      .query(`
        INSERT INTO Restaurants (Name, Address, Phone, OpenTime, CloseTime, RestaurantStatus)
        VALUES (@name, @address, @phone, @openTime, @closeTime, @restaurantStatus)
      `);

    return NextResponse.json({ message: 'Restaurant created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
