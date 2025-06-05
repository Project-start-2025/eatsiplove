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

// Xử lý chuyển đổi Time đầu vào "08:00" → "08:00:00"
function parseTimeString(timeStr: string): Date {
  const date = new Date(`1970-01-01T${timeStr}`);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid time format");
  }
  return date;
}


//Người dùng gửi yêu cầu để tạo mới Cửa hàng
//Đơn đăng ký sẽ được lưu vào bảng phụ RestaurantRequests
export async function POST(req: NextRequest) {
  try {
    const body: Restaurant = await req.json();

    const {name, address, phone, openTime, closeTime, restaurantStatus } = body;

    if (!name || !address || !phone || !openTime || !closeTime) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const pool = await sql.connect(config);
    const openTimeFormatted = parseTimeString(body.openTime); // "08:00" → "08:00:00"
    const closeTimeFormatted = parseTimeString(body.closeTime);



    await pool.request()
      //.input('idOwner', sql.Int, idOwner)
      .input('name', sql.NVarChar, name)
      .input('address', sql.NVarChar, address)
      .input('phone', sql.NVarChar, phone)
      .input('openTime', sql.Time, openTimeFormatted)
      .input('closeTime', sql.Time, closeTimeFormatted)
      .input('restaurantStatus', sql.Bit, restaurantStatus)
      .query(`
        INSERT INTO RestaurantRequests (Name, Address, Phone, OpenTime, CloseTime, RestaurantStatus)
        VALUES (@name, @address, @phone, @openTime, @closeTime, @restaurantStatus)
      `);

    return NextResponse.json({ message: 'Restaurant created successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error creating restaurant:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
