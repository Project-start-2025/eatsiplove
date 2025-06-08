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

function parseTimeString(timeStr: string): string {
  const date = new Date(`2025-01-01T${timeStr}`);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid time format");
  }
  // Trả về định dạng HH:mm:ss
  return date.toTimeString().split(" ")[0];
}

//Cửa hàng duyệt thành công
//Lưu đơn đăng ký vào bảng chính
export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json(); // id của yêu cầu trong RestaurantRequests

    const pool = await sql.connect(config);

    const request = await pool.request()
      .input('id', sql.Int, id)
      .query(`SELECT * FROM RestaurantRequests WHERE Id = @id`);

    const record = request.recordset[0];
    if (!record) return NextResponse.json({ message: 'Request not found' }, { status: 404 });

    // Chèn vào bảng chính Restaurants
    await pool.request()
      .input('name', sql.NVarChar, record.Name)
      .input('address', sql.NVarChar, record.Address)
      .input('phone', sql.NVarChar, record.Phone)
      .input('openTime', sql.Time, record.OpenTime)
      .input('closeTime', sql.Time, record.CloseTime)
      .input('restaurantStatus', sql.Bit, record.RestaurantStatus)
      .query(`
        INSERT INTO Restaurants (Name, Address, Phone, OpenTime, CloseTime, RestaurantStatus)
        VALUES (@name, @address, @phone, @openTime, @closeTime, @restaurantStatus)
      `);

    // Xóa bản ghi khỏi bảng yêu cầu
    await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM RestaurantRequests WHERE Id = @id`);

    return NextResponse.json({ message: 'Request approved and moved to main table' }, { status: 200 });
  } catch (error) {
    console.error('Error approving request:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}